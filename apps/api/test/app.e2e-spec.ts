import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

describe('Portfolio API (e2e)', () => {
  let app: INestApplication;
  let token: string;

  const admin = { email: 'admin@test.com', password: 'test-password-123' };
  const project = {
    title: 'Sprinkle & Co.',
    slug: 'sprinkle-and-co',
    summary: 'Bakery POS app',
    techStack: ['React', 'TypeScript'],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();

    const res = await request(app.getHttpServer()).post('/api/auth/login').send(admin);
    token = res.body.accessToken;
  });

  beforeEach(async () => {
    // Clean content tables before every test (users stay, so the admin keeps working)
    await app
      .get(DataSource)
      .query('TRUNCATE projects, skills, experience, contact_messages CASCADE');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    it('rejects a wrong password', () =>
      request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ ...admin, password: 'wrong-password' })
        .expect(401));

    it('returns the current user with a valid token', () =>
      request(app.getHttpServer())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect((res) => expect(res.body.email).toBe(admin.email)));
  });

  describe('Projects', () => {
    it('blocks creating without a token', () =>
      request(app.getHttpServer()).post('/api/projects').send(project).expect(401));

    it('creates a project with a token and reads it back by slug', async () => {
      await request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send(project)
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/projects/slug/sprinkle-and-co')
        .expect(200);

      expect(res.body.title).toBe('Sprinkle & Co.');
    });

    it('rejects unknown fields', () =>
      request(app.getHttpServer())
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...project, hacker: true })
        .expect(400));
  });

  describe('Contact', () => {
    it('keeps messages private', () =>
      request(app.getHttpServer()).get('/api/contact').expect(401));

    it('does not save honeypot submissions', async () => {
      await request(app.getHttpServer())
        .post('/api/contact')
        .send({ name: 'Bot', email: 'bot@spam.com', message: 'Buy cheap stuff now!', website: 'spam.com' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/contact')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body).toHaveLength(0);
    });
  });
});
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = { findByEmailWithPassword: jest.fn() };
  const jwtService = { signAsync: jest.fn().mockResolvedValue('fake-token') };

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();
    service = moduleRef.get(AuthService);
  });

  it('returns a token for valid credentials', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 4);
    usersService.findByEmailWithPassword.mockResolvedValue({
      id: 'user-1', email: 'admin@test.com', passwordHash,
    });

    await expect(
      service.login({ email: 'admin@test.com', password: 'correct-password' }),
    ).resolves.toEqual({ accessToken: 'fake-token' });

    expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: 'user-1', email: 'admin@test.com' });
  });

  it('rejects a wrong password', async () => {
    const passwordHash = await bcrypt.hash('correct-password', 4);
    usersService.findByEmailWithPassword.mockResolvedValue({
      id: 'user-1', email: 'admin@test.com', passwordHash,
    });

    await expect(
      service.login({ email: 'admin@test.com', password: 'wrong-password' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('rejects an unknown email', async () => {
    usersService.findByEmailWithPassword.mockResolvedValue(null);

    await expect(
      service.login({ email: 'nobody@test.com', password: 'whatever123' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
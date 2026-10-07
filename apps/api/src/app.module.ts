import { Module} from '@nestjs/common';
import { ConfigModule , ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { ExperienceModule } from './experience/experience.module';
import { ContactModule } from './contact/contact.module';
import { ThrottlerModule } from '@nestjs/throttler';



@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 3 }]),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env', }),
        TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const databaseUrl = config.get<string>('DATABASE_URL');

        // Production (Neon): one URL + SSL. Local (Docker): separate values, no SSL.
        const connection = databaseUrl
          ? { url: databaseUrl, ssl: true }
          : {
              host: config.get('DB_HOST'),
              port: Number(config.get('DB_PORT')),
              username: config.get('DB_USER'),
              password: config.get('DB_PASSWORD'),
              database: config.get('DB_NAME'),
            };

        return {
          type: 'postgres',
          ...connection,
          autoLoadEntities: true,
          synchronize: false,
          uuidExtension: 'pgcrypto',
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          migrationsRun: true,
        };
      },
    }),
    ProjectsModule,
    UsersModule,
    AuthModule,
    SkillsModule,
    ExperienceModule,
    ContactModule,
  ],
})
export class AppModule {}
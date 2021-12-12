import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './common/database/typeorm.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkinsModule } from './skins/skins.module';
import { TagsModule } from './tags/tags.module';
import { NewsModule } from './news/news.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { TasksModule } from './tasks/tasks.module';
import * as configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.configuration],
      validationSchema: configuration.validationSchema,
      validationOptions: configuration.validationOptions,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AuthModule,
    SkinsModule,
    TagsModule,
    NewsModule,
    UserSettingsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ExercisesModule } from './modules/exercises/exercises.module'
import { PrismaModule } from './infra/db/prisma.module'

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ExercisesModule],
	controllers: [AppController],
})
export class AppModule {}

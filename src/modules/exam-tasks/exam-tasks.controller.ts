import { Controller } from '@nestjs/common';
import { ExamTasksService } from './exam-tasks.service';

@Controller('exam-tasks')
export class ExamTasksController {
  constructor(private readonly examTasksService: ExamTasksService) {}
}

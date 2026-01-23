import { Controller } from '@nestjs/common';
import { ExamSectionsService } from './exam-sections.service';

@Controller('exam-sections')
export class ExamSectionsController {
  constructor(private readonly examSectionsService: ExamSectionsService) {}
}

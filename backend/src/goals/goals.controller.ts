import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}


  @Get('dashboard')
  async getDashboard(@Query('userId', ParseIntPipe) userId: number) {
    return this.goalsService.getGoalsDashboard(userId);
  }
}
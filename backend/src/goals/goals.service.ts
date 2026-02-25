import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  
  async getGoalsDashboard(userId: number) {
    // Pobieramy cele użytkownika wraz z ich transakcjami
    const goals = await this.prisma.goals.findMany({
      where: { user_id: userId },
      include: {
        transactions: true, 
      },
    });

  
    return goals.map((goal) => {
      // Logika liczenia progresu
     
      const currentAmount = goal.transactions.reduce((sum, t) => {
        return sum + Number(t.amount); 
      }, 0);

      const targetAmount = Number(goal.goal_amount); //
      const progressPercent = targetAmount > 0 
        ? Math.round((currentAmount / targetAmount) * 100) 
        : 0;

      // Przewidywana data osiągnięcia celu
      const estimatedDate = this.calculateEstimatedDate(
        currentAmount,
        targetAmount,
        goal.transactions,
      );

      return {
        id: goal.goal_id,
        name: goal.goal_name,
        target: targetAmount,
        collected: currentAmount,
        progress: progressPercent + '%', 
        deadline: goal.deadline,
        estimatedCompletionDate: estimatedDate, 
      };
    });
  }

  
  private calculateEstimatedDate(current: number, target: number, transactions: any[]): Date | string {
    if (current >= target) return 'Cel osiągnięty!';
    if (current === 0 || transactions.length === 0) return 'Brak danych do obliczeń';

    
    const firstTransactionDate = new Date(
      Math.min(...transactions.map((t) => new Date(t.transaction_date).getTime())),
    );
    const now = new Date();
    
    
    const daysPassed = (now.getTime() - firstTransactionDate.getTime()) / (1000 * 3600 * 24);
    
   
    if (daysPassed < 1) return 'Zbyt mało danych';

   
    const dailySavingRate = current / daysPassed;

   
    const remainingAmount = target - current;

    
    const daysRemaining = remainingAmount / dailySavingRate;

  
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + daysRemaining);

    return estimatedDate;
  }
}
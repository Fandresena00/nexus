"use server";

import prisma from "@/lib/prisma";
import { TaskStatus, TaskPriority } from "@/generated/prisma/enums";

export interface DashboardStats {
  totalProjects: number;
  inProgressProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalTasks: number;
  tasksByStatus: {
    TODO: number;
    IN_PROGRESS: number;
    REVIEW: number;
    DONE: number;
  };
  tasksByPriority: {
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
}

export interface TaskForToday {
  id: string;
  description: string;
  priority: TaskPriority;
  deadline: Date;
  projectId: string;
  projectTitle: string;
  userName: string;
}

export interface RecentActivity {
  id: string;
  text: string;
  time: string;
  user: string;
  type: "task" | "project" | "member";
  createdAt: Date;
}

/**
 * Get comprehensive dashboard statistics for a user
 */
export async function getDashboardStats(
  userId: string,
): Promise<DashboardStats> {
  try {
    const now = new Date();

    // Get all projects user owns or has access to
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      include: {
        tasks: true,
      },
    });

    const totalProjects = projects.length;

    // Calculate project statistics
    let completedProjects = 0;
    let inProgressProjects = 0;
    let overdueProjects = 0;

    projects.forEach((project) => {
      const allTasksDone = project.tasks.every(
        (task) => task.taskStatus === TaskStatus.DONE,
      );
      const hasInProgressTasks = project.tasks.some(
        (task) =>
          task.taskStatus === TaskStatus.IN_PROGRESS ||
          task.taskStatus === TaskStatus.REVIEW,
      );
      const isOverdue = project.deadline < now && !allTasksDone;

      if (allTasksDone && project.tasks.length > 0) {
        completedProjects++;
      } else if (hasInProgressTasks) {
        inProgressProjects++;
      }

      if (isOverdue) {
        overdueProjects++;
      }
    });

    // Get all tasks for the user's projects
    const allTasks = projects.flatMap((p) => p.tasks);
    const totalTasks = allTasks.length;

    // Count tasks by status
    const tasksByStatus = {
      TODO: allTasks.filter((t) => t.taskStatus === TaskStatus.TODO).length,
      IN_PROGRESS: allTasks.filter(
        (t) => t.taskStatus === TaskStatus.IN_PROGRESS,
      ).length,
      REVIEW: allTasks.filter((t) => t.taskStatus === TaskStatus.REVIEW).length,
      DONE: allTasks.filter((t) => t.taskStatus === TaskStatus.DONE).length,
    };

    // Count tasks by priority
    const tasksByPriority = {
      HIGH: allTasks.filter((t) => t.priority === TaskPriority.HIGH).length,
      MEDIUM: allTasks.filter((t) => t.priority === TaskPriority.MEDIUM).length,
      LOW: allTasks.filter((t) => t.priority === TaskPriority.LOW).length,
    };

    return {
      totalProjects,
      inProgressProjects,
      completedProjects,
      overdueProjects,
      totalTasks,
      tasksByStatus,
      tasksByPriority,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}

/**
 * Get tasks due today and soon for a user
 */
export async function getTasksForToday(
  userId: string,
): Promise<TaskForToday[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2); // Today and tomorrow

    // Get projects the user has access to
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
      },
    });

    const projectIds = projects.map((p) => p.id);

    // Get tasks due today or tomorrow, not yet done
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
        deadline: {
          gte: today,
          lt: tomorrow,
        },
        taskStatus: {
          not: TaskStatus.DONE,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: [{ priority: "asc" }, { deadline: "asc" }],
      take: 10,
    });

    return tasks.map((task) => ({
      id: task.id,
      description: task.description,
      priority: task.priority,
      deadline: task.deadline,
      projectId: task.projectId,
      projectTitle: task.project.title,
      userName: task.user.name,
    }));
  } catch (error) {
    console.error("Error fetching tasks for today:", error);
    throw error;
  }
}

/**
 * Get recent activity across all user projects
 */
export async function getRecentActivity(
  userId: string,
): Promise<RecentActivity[]> {
  try {
    // Get projects the user has access to
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
      },
    });

    const projectIds = projects.map((p) => p.id);

    // Get recent tasks (created or updated recently)
    const recentTasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    });

    // Get recent projects
    const recentProjects = await prisma.project.findMany({
      where: {
        id: { in: projectIds },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });

    // Combine and format activities
    const activities: RecentActivity[] = [];

    // Add task activities
    recentTasks.forEach((task) => {
      const timeAgo = getTimeAgo(task.updatedAt);
      let text = "";

      if (task.taskStatus === TaskStatus.DONE) {
        text = `Task "${task.description}" completed in "${task.project.title}"`;
      } else if (task.taskStatus === TaskStatus.IN_PROGRESS) {
        text = `Task "${task.description}" started in "${task.project.title}"`;
      } else {
        text = `Task "${task.description}" updated in "${task.project.title}"`;
      }

      activities.push({
        id: task.id,
        text,
        time: timeAgo,
        user: task.user.name,
        type: "task",
        createdAt: task.updatedAt,
      });
    });

    // Add project activities
    recentProjects.forEach((project) => {
      const timeAgo = getTimeAgo(project.updatedAt);
      activities.push({
        id: project.id,
        text: `Project "${project.title}" updated`,
        time: timeAgo,
        user: project.user.name,
        type: "project",
        createdAt: project.updatedAt,
      });
    });

    // Sort by date and limit to 8 most recent
    return activities
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 8);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    throw error;
  }
}

/**
 * Get productivity data for the last 7 days
 */
export async function getProductivityData(
  userId: string,
): Promise<{ day: string; value: number; completedTasks: number }[]> {
  try {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Get projects the user has access to
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    const projectIds = projects.map((p) => p.id);

    // Get all tasks updated in the last 7 days
    const tasks = await prisma.task.findMany({
      where: {
        projectId: { in: projectIds },
        updatedAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        updatedAt: true,
        taskStatus: true,
      },
    });

    // Count completed tasks per day
    const productivityMap = new Map<number, number>();

    tasks.forEach((task) => {
      const dayIndex = task.updatedAt.getDay();
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert Sunday=0 to index 6

      if (task.taskStatus === TaskStatus.DONE) {
        productivityMap.set(
          adjustedIndex,
          (productivityMap.get(adjustedIndex) || 0) + 1,
        );
      }
    });

    // Calculate percentage based on max tasks completed
    const maxTasks = Math.max(...Array.from(productivityMap.values()), 1);

    return days.map((day, index) => {
      const completedTasks = productivityMap.get(index) || 0;
      const value = Math.round((completedTasks / maxTasks) * 100);

      return {
        day,
        value: value || 0,
        completedTasks,
      };
    });
  } catch (error) {
    console.error("Error fetching productivity data:", error);
    throw error;
  }
}

/**
 * Get upcoming deadlines (next 7 days)
 */
export async function getUpcomingDeadlines(userId: string): Promise<{
  within24h: number;
  within7days: number;
}> {
  try {
    const now = new Date();
    const in24h = new Date(now);
    in24h.setHours(in24h.getHours() + 24);
    const in7days = new Date(now);
    in7days.setDate(in7days.getDate() + 7);

    // Get projects the user has access to
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { userId: userId },
          {
            access: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    const projectIds = projects.map((p) => p.id);

    // Count tasks with deadlines in next 24h
    const within24hCount = await prisma.task.count({
      where: {
        projectId: { in: projectIds },
        deadline: {
          gte: now,
          lt: in24h,
        },
        taskStatus: {
          not: TaskStatus.DONE,
        },
      },
    });

    // Count tasks with deadlines in next 7 days
    const within7daysCount = await prisma.task.count({
      where: {
        projectId: { in: projectIds },
        deadline: {
          gte: now,
          lt: in7days,
        },
        taskStatus: {
          not: TaskStatus.DONE,
        },
      },
    });

    return {
      within24h: within24hCount,
      within7days: within7daysCount,
    };
  } catch (error) {
    console.error("Error fetching upcoming deadlines:", error);
    throw error;
  }
}

/**
 * Helper function to format time ago
 */
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

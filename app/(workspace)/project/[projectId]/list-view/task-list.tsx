import { Task } from "@/generated/prisma/client";
import RenderTask from "./render-task";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { FileBarChart2, FileText, Tag, Clock, TrendingUp } from "lucide-react";
import NewTaskForm from "@/components/form/task/new-task-form";

export default function TaskList({
  initialTasks = [],
  userId,
  projectId,
  userRole,
}: {
  initialTasks: Task[];
  userId: string;
  projectId: string;
  userRole: "OWNER" | "EDITOR" | "VIEWER" | null;
}) {
  const canEdit = userRole === "OWNER" || userRole === "EDITOR";

  return (
    <div className="w-full mt-6 min-h-[70vh] dark">
      {/* Table Header */}
      <div className="relative overflow-hidden rounded-t-xl bg-linear-to-r from-muted/80 to-muted/40 border border-border backdrop-blur-sm">
        {/* Neon top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {/* Left Header */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 border border-primary/30">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-bold text-foreground uppercase tracking-wider">
              Description & Priority
            </p>
          </div>

          {/* Right Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-secondary" />
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Tags
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Status
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Deadline
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      {initialTasks.length > 0 ? (
        <div
          className="flex flex-col gap-3 p-4 bg-muted/10 border-x border-b border-border rounded-b-xl"
          style={{
            animation:
              "fade-in-up 0.5s cubic-bezier(0.2, 0, 0, 1) 0.2s forwards",
            opacity: 0,
          }}
        >
          {initialTasks.map((task, index) => (
            <div
              key={task.id}
              style={{
                animation: `fade-in-up 0.3s cubic-bezier(0.2, 0, 0, 1) ${0.3 + index * 0.05}s forwards`,
                opacity: 0,
              }}
            >
              <RenderTask
                task={task}
                projectId={projectId}
                userId={userId}
                userRole={userRole}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[60vh] border-x border-b border-border rounded-b-xl bg-muted/10">
          <Empty className="border-2 border-dashed border-border max-w-md mx-auto bg-muted/20 backdrop-blur-sm">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <div className="relative">
                  <div
                    className="absolute inset-0 bg-primary/20 blur-2xl"
                    style={{
                      animation: "pulse-glow 3s ease-in-out infinite",
                    }}
                  />
                  <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-primary to-secondary border border-primary/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <FileBarChart2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </EmptyMedia>
              <EmptyTitle className="text-xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                No Tasks Yet
              </EmptyTitle>
              <EmptyDescription className="text-muted-foreground">
                {canEdit
                  ? "Create your first task to start tracking progress"
                  : "No tasks available in this project"}
              </EmptyDescription>
              {canEdit && (
                <EmptyContent className="mt-6">
                  <NewTaskForm userId={userId} projectId={projectId} />
                </EmptyContent>
              )}
            </EmptyHeader>
          </Empty>
        </div>
      )}
    </div>
  );
}

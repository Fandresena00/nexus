import TaskCard from "@/src/components/ui/task/task-card";
import TaskColumn from "@/src/components/ui/task/task-column";

export default function page() {
  return (
    <div className=" flex flex-1 pb-6 pr-3.5 gap-3.5">
      {/** To Do Column */}
      <TaskColumn title="to do">
        <TaskCard
          taskId="uid"
          title="Refonte architecture microservices"
          description="Migration complète vers une architecture modulaire avec Docker et Kubernetes"
          days="15"
          month="Dec"
          years="2025"
        />
      </TaskColumn>
      {/** In Progress Column */}
      <TaskColumn title="in progress">
        <TaskCard
          taskId="uid"
          title="Refonte architecture microservices"
          description="Migration complète vers une architecture modulaire avec Docker et Kubernetes"
          days="15"
          month="Dec"
          years="2025"
        />
      </TaskColumn>
      {/** Reviw column */}
      <TaskColumn title="review">
        <TaskCard
          taskId="uid"
          title="Refonte architecture microservices"
          description="Migration complète vers une architecture modulaire avec Docker et Kubernetes"
          days="15"
          month="Dec"
          years="2025"
        />
      </TaskColumn>
      {/** Done column */}
      <TaskColumn title="done">
        <TaskCard
          taskId="uid"
          title="Refonte architecture microservices"
          description="Migration complète vers une architecture modulaire avec Docker et Kubernetes"
          days="15"
          month="Dec"
          years="2025"
        />
      </TaskColumn>
    </div>
  );
}

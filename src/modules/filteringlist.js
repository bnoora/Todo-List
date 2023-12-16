import Storage from "./storage"

const upcomingWeek = (storage) => {
    const projects = storage.getProjects();
    const today = new Date();
    const weekFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    const upcomingWeekTasks = [];
    projects.forEach(project => {
        project.getTasks().forEach(task => {
            if (task.getTaskDueDate() > today && task.getTaskDueDate() <= weekFromToday) {
                upcomingWeekTasks.push(task);
            }
        });
    });
    return upcomingWeekTasks;
}

const today = (storage) => {
    const projects = storage.getProjects();
    const today = new Date();
    const todayTasks = [];
    projects.forEach(project => {
        project.getTasks().forEach(task => {
            if (task.getTaskDueDate() <= today) {
                todayTasks.push(task);
            }
        });
    });
    return todayTasks;
}

const allProjects = (storage) => {
    return storage.getProjects();
}

const tasksByProject = (projectId, storage) => {
    return storage.getProjectTasks(projectId);
}

export { upcomingWeek, today, allProjects, tasksByProject };




class Task {
    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.completed = false;
        this.dueDate = null;
        this.priority = 'low';
    }

    setTaskId(id) {
        this.id = id;
    }

    setTaskTitle(title) {
        this.title = title;
    }

    setTaskDescription(description) {
        this.description = description;
    }

    setTaskCompleted(completed) {
        this.completed = completed;
    }

    setTaskDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setTaskPriority(priority) {
        this.priority = priority;
    }

    getTaskId() {
        return this.id;
    }

    getTaskTitle() {
        return this.title;
    }

    getTaskDescription() {
        return this.description;
    }

    getTaskCompleted() {
        return this.completed;
    }

    getTaskDueDate() {
        return this.dueDate;
    }

    getTaskPriority() {
        return this.priority;
    }
}

export default Task;
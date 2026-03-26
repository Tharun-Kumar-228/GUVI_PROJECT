const taskManager = require('./taskManager');

describe('Task Manager Logic', () => {
  beforeEach(() => {
    taskManager.clearTasks();
  });

  test('should add a task correctly', () => {
    const task = taskManager.addTask('Buy groceries');
    expect(task.name).toBe('Buy groceries');
    expect(taskManager.getTasks().length).toBe(1);
  });

  test('should return all tasks correctly', () => {
    taskManager.addTask('Task 1');
    taskManager.addTask('Task 2');
    const tasks = taskManager.getTasks();
    expect(tasks.length).toBe(2);
    expect(tasks[0].name).toBe('Task 1');
  });

  test('should delete a task by id', () => {
    const task = taskManager.addTask('Temporary Task');
    const success = taskManager.deleteTask(task.id);
    expect(success).toBe(true);
    expect(taskManager.getTasks().length).toBe(0);
  });

  test('should handle invalid input', () => {
    expect(() => taskManager.addTask('')).toThrow('Invalid task name');
    expect(() => taskManager.addTask(null)).toThrow('Invalid task name');
  });

  test('should return false when deleting non-existent task', () => {
    const success = taskManager.deleteTask(999);
    expect(success).toBe(false);
  });
});

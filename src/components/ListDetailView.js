import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import ProgressBar from './ProgressBar';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { icons } from './icons';
import './ListDetailView.css';

function ListDetailView({ lists, updateListTasks }) {
    const { listId } = useParams();
    const list = lists.find(list => list.id.toString() === listId);

    const {
        tasks,
        setTasks,
        addTask,
        editTask,
        toggleTaskCompleted,
        calculateProgress
    } = useTasks(list ? list.tasks : []);

    const [editingTaskId, setEditingTaskId] = useState(null);

    const tasksAreEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].id !== b[i].id || a[i].isCompleted !== b[i].isCompleted || a[i].text !== b[i].text) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        if (list && !tasksAreEqual(tasks, list.tasks)) {
            updateListTasks(list.id, tasks);
        }
    }, [tasks, list, updateListTasks]);

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
    };

    if (!list) {
        return <div>List not found</div>;
    }

    const IconComponent = icons.find(icon => icon.name === list.icon)?.component;

    return (
        <div className="list-detail-view">
            <h1>{list.title}</h1>
            {IconComponent && <IconComponent size={30} />}
            <ProgressBar progress={calculateProgress()} color={list.colorTheme} />
            <TodoForm
                addTodo={addTask}
                editTodo={editTask}
                todoBeingEdited={tasks.find(task => task.id === editingTaskId)}
                cancelEdit={handleCancelEdit}
            />
            <TodoList
                todos={tasks}
                toggleComplete={toggleTaskCompleted}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
}

export default ListDetailView;






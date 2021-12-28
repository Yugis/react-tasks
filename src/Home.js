import { useEffect, useState } from 'react';
import Floatie from './Floatie';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [Success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/tasks')
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  }, []);

  const handleDelete = (id) => {
    fetch('http://localhost:8080/tasks/' + id, {
      method: 'DELETE',
    }).then((resp) => {
      if (resp.ok) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
  };

  const markAsComplete = (task) => {
    task.completed = true;
    // console.log(task);
    fetch('http://localhost:8080/tasks/' + task.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    }).then(() => {
      const newTasks = tasks.map((item) => {
        if (item.id === task.id) {
          const updatedTask = {
            ...item,
            completed: true,
          };
          return updatedTask;
        }
        return item;
      });

      setTasks(newTasks);
    });
  };

  return (
    <div>
      <h1 className='text-gray-500 text-center'>All Tasks</h1>
      <br />
      {tasks.length ? (
        tasks.map((task) => (
          <div
            className='flex align-center my-5 hover:shadow-gray-200 hover:shadow-md p-4 rounded'
            key={task.id}
          >
            <div
              className={`w-1/2 text-lg ${
                task.completed ? 'line-through italic' : ''
              }`}
            >
              {task.description}
            </div>
            <div className='w-1/2'>
              {task.completed ? (
                ''
              ) : (
                <button
                  onClick={() => markAsComplete(task)}
                  className='py-1 px-2 border-green-200 border-2 rounded text-green-600 hover:text-white hover:bg-green-300 text-sm hover:border-white'
                >
                  Mark As Completed
                </button>
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className='py-1 px-2 border-red-200 border-2 rounded text-red-600 hover:text-white hover:bg-red-300 text-sm hover:border-white'
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1 className='italic text-gray-400 text-center'>
          No Tasks Available!
        </h1>
      )}

      {Success ? <Floatie message={'Deleted Succesfully!'} /> : ''}
    </div>
  );
};

export default Home;

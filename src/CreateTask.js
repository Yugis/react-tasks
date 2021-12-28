import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Floatie from './Floatie';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [Success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = { description: taskName, completed: false };

    setIsLoading(true);

    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((resp) => {
        setTaskName('');
        setIsLoading(false);
        if (resp.ok) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        }
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className='text-center'>Create New Task</h1>
      <br />
      <form
        className='flex align-center justify-center flex-col mx-auto'
        onSubmit={handleSubmit}
      >
        <label>Task Name</label>
        <input
          type='text'
          name='task_name'
          value={taskName}
          className='rounded border-amber-400 border-2 focus-visible:outline-none focus-visible:border-amber-500'
          onInput={(e) => setTaskName(e.target.value)}
          autoComplete='off'
          autoFocus
        />
        <br />
        <div className='flex justify-end align-center'>
          {loading ? (
            <button
              className='py-1 px-2 border-green-200 bg-green-100 border-2 rounded text-green-400 text-sm cursor-not-allowed italic'
              disabled
            >
              Submitting...
            </button>
          ) : (
            <button className='py-1 px-2 border-green-200 border-2 rounded text-green-600 hover:text-white hover:bg-green-300 text-sm hover:border-white'>
              Submit
            </button>
          )}
        </div>
      </form>

      {Success ? <Floatie message={'Created!'} /> : ''}
    </div>
  );
};

export default CreateTask;

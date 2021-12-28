import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className='flex mb-10 px-10 py-5 bg-orange-100 text-amber-600 font-mono '>
        <section className='w-2/3 text-xl'>TaskApp</section>
        <section className='w-1/3'>
          <ul className='flex justify-between w-1/3 text-lg'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/create/'>New Task</Link>
            </li>
          </ul>
        </section>
      </nav>
      <div className='flex align-center justify-center flex-col w-1/3 mx-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;

import { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon, NavItem } from '../shared';
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { BellIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useUser } from '../../../store';

const Navbar = ({ showNav, setShowNav }) => {
  const { name, lastName } = useUser();
  const links = [
    {
      path: '/logout',
      title: 'Cerrar sesión',
      icon: <Icon icon='LogoutIcon' color='secondary' />,
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-300 ${
        showNav ? 'pl-56' : ''
      }`}
    >
      <div className='pl-4 md:pl-6'>
        <Bars3CenterLeftIcon
          className='h-8 w-8 text-gray-500 cursor-pointer'
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className='flex items-center pr-4 md:pr-16'>
        <div className='relative mr-5 md:mr-8 cursor-pointer text-slate-800'>
          <BellIcon
            className='h-6 w-6'
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          />
          <AnimatePresence>
            {isPopoverOpen && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className='absolute -right-16 sm:right-4 z-50 mt-2 bg-slate-100 shadow-sm rounded max-w-xs sm:max-w-sm w-screen'
              >
                <div className='relative p-3'>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-gray-800 font-medium'>Notificaciones</p>
                    <a className='text-sm text-amber-600' href='#'>
                      Ver todas
                    </a>
                  </div>
                  <div className='mt-4 grid gap-4 grid-cols-1 overflow-hidden'>
                    <div className='flex'>
                      <div className='rounded-full shrink-0 bg-amber-200 h-8 w-8 flex items-center justify-center'>
                        <CheckIcon className='h-4 w-4 text-amber-600' />
                      </div>
                      <div className='ml-4'>
                        <p className='font-medium text-gray-800'>
                          Notificacion Title
                        </p>
                        <p className='text-sm text-gray-500 truncate'>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className='relative inline-block text-left'>
          <div
            className='inline-flex w-full justify-center items-center'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <picture>
              <img
                src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                className='rounded-full h-8 md:mr-4 border-2 border-slate-900 shadow-sm'
                alt='Profile picture'
              />
            </picture>
            <span className='hidden md:block font-medium text-slate-800'>
              {name} {lastName}
            </span>
            <ChevronDownIcon className='ml-2 h-4 w-4 text-slate-800' />
          </div>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className='absolute right-0 w-56 z-50 mt-2 origin-top-right bg-slate-900 rounded shadow-sm'
              >
                <div className='p-1'>
                  {links.map((item) => (
                    <div key={item.path}>
                      <NavItem
                        icon={item.icon}
                        classname='!flex hover:!bg-slate-700  hover:!text-amber-500 !text-amber-500 !rounded !p-2 !text-sm !group !transition-colors !items-center'
                        title={item.title}
                        path={item.path}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

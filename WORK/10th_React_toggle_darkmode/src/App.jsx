import { useEffect } from "react";


const App = () => {
  const darkMode = () => {
    if(sessionStorage.getItem('darkMode') === "on") {
      document.body.classList.remove('dark');
      document.body.classList.remove('bg-gray-800');
      sessionStorage.setItem('darkMode', "off");
      return;
    }
    sessionStorage.setItem('darkMode', "on");
    document.body.classList.add('dark');
    document.body.classList.add('bg-gray-800');
  }

  useEffect(() => {
    if(sessionStorage.getItem('darkMode') === "on") {
      document.body.classList.add('dark');
      document.body.classList.add('bg-gray-900');
    }
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen dark:bg-gray-800 dark:text-white">
      <div className="p-6 bg-gradient-to-tr from-blue-300 via-white to-blue-400 text-center dark:bg-gradient-to-tr dark:from-gray-900 dark:via-gray-700 dark:to-gray-900">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold dark:text-white">Hello World</h1>
        <button className="border-[3px] border-slate-300 px-3 py-2 rounded-md mt-2 text-cyan-500 font-bold hover:bg-blue-600 hover:text-white dark:border-white dark:border-2 dark:text-white" onClick={() => darkMode()} >Dark Mode</button>
      </div>
      <div className="container mx-auto py-6 grid md:grid-cols-3 gap-4">
        <div className="border border-blue-900 p-4 bg-white rounded shadow-md shadow-blue-300 dark:bg-gray-800 dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt reprehenderit, officia, modi fuga a cum sapiente reiciendis repudiandae, minima quisquam quae et culpa magni excepturi unde. Nam expedita, non vel alias unde suscipit quaerat laudantium quisquam quia repellendus harum magnam consectetur molestias veniam ea! Nesciunt, aut repellendus. Suscipit aliquid sed itaque facere. Fuga vel accusamus alias voluptatibus nemo, blanditiis ducimus?
        </div>
        <div className="border border-blue-900 p-4 bg-white rounded shadow-md shadow-blue-300 dark:bg-gray-800 dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt reprehenderit, officia, modi fuga a cum sapiente reiciendis repudiandae, minima quisquam quae et culpa magni excepturi unde. Nam expedita, non vel alias unde suscipit quaerat laudantium quisquam quia repellendus harum magnam consectetur molestias veniam ea! Nesciunt, aut repellendus. Suscipit aliquid sed itaque facere. Fuga vel accusamus alias voluptatibus nemo, blanditiis ducimus?
        </div>
        <div className="border border-blue-900 p-4 bg-white rounded shadow-md shadow-blue-300 dark:bg-gray-800 dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt reprehenderit, officia, modi fuga a cum sapiente reiciendis repudiandae, minima quisquam quae et culpa magni excepturi unde. Nam expedita, non vel alias unde suscipit quaerat laudantium quisquam quia repellendus harum magnam consectetur molestias veniam ea! Nesciunt, aut repellendus. Suscipit aliquid sed itaque facere. Fuga vel accusamus alias voluptatibus nemo, blanditiis ducimus?
        </div>
      </div>
    </div>
  )
}

export default App
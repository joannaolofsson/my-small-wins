const TabBar = () => {
    return (
      <div className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around items-center p-4 md:hidden">
        <button className="flex flex-col items-center">
          <span className="material-icons">home</span>
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <span className="material-icons">search</span>
          <span className="text-xs">Search</span>
        </button>
        <button className="flex flex-col items-center">
          <span className="material-icons">settings</span>
          <span className="text-xs">Settings</span>
        </button>
      </div>
    );
  };
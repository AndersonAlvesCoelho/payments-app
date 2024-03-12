export default function NavigationMenu() {
  return (
    <div className="flex-shrink-0 w-64 bg-zinc-800 text-white">
      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Menu Lateral</h1>
        <ul>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-400">
              Link 1
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-400">
              Link 2
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="block text-white hover:text-gray-400">
              Link 3
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function NotificationsDropdown() {
  const notifications = [
    { id: 1, message: "New episodes of Stranger Things are now available!" },
    { id: 2, message: "Don't miss the premiere of The Witcher Season 3" },
  ]

  return (
    <div className="absolute right-0 mt-2 w-80 bg-black border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
      <div className="py-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="px-4 py-2 hover:bg-gray-800">
              <p className="text-sm text-white">{notification.message}</p>
            </div>
          ))
        ) : (
          <div className="px-4 py-2">
            <p className="text-sm text-gray-400">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}
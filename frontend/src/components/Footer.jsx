export default function Footer({ pendingCount, onClearAll }) {
    return (
        <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-gray-600 text-sm">
                You have {pendingCount} pending tasks
            </span>
            <button
                onClick={onClearAll}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-1 rounded-lg transition"
            >
                Clear All
            </button>
        </div>
    );
}

export default function EmptyNoteState() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="mb-4">
                <img
                    src="/empty.svg"
                    alt="Empty state illustration"
                    className="w-64 h-64 md:w-100 md:h-100 lg:w-100 lg:h-100 mx-auto"
                />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No note selected</h2>
            <p className="text-sm lg:text-lg text-muted-foreground mb-4">
                Select a note from the sidebar or create a new one to get
                started.
            </p>
        </div>
    );
}

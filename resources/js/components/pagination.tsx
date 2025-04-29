interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {

    return (
        <div className="mt-6 flex justify-center gap-2 flex-wrap ">
        <button
            className="px-3 py-1 bg-[#8884d8] text-white rounded hover:bg-gray-800 disabled:opacity-50"
            onClick={() => {
                if (currentPage > 1) {
                    const queryParams = new URLSearchParams(window.location.search);
                    queryParams.set('page', (currentPage - 1).toString());
                    window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                }
            }}
            disabled={currentPage === 1}
        >
            Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
                key={num}
                className={`px-3 py-1 rounded ${
                    num === currentPage
                        ? 'bg-[#8884d8] text-white border-2 border-[#1f2937]'
                        : 'bg-[#8884d8] text-white hover:bg-gray-800'
                }`}
                onClick={() => {
                    const queryParams = new URLSearchParams(window.location.search);
                    queryParams.set('page', num.toString());
                    window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                }}
            >
                {num}
            </button>
        ))}
        <button
            className="px-3 py-1 bg-[#8884d8] text-white rounded hover:bg-gray-800 disabled:opacity-50"
            onClick={() => {
                if (currentPage < totalPages) {
                    const queryParams = new URLSearchParams(window.location.search);
                    queryParams.set('page', (currentPage + 1).toString());
                    window.location.href = `${window.location.pathname}?${queryParams.toString()}`;
                }
            }}
            disabled={currentPage === totalPages}
        >
            Siguiente
        </button>
    </div>
    );
}

export default PaginationComponent;
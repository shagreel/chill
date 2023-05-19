export const BorrowModal = (game, onClose) => {
    return (
        <div className="modal">
            <div onClick={onClose} className="overlay"></div>
            <div className="modal-content">
                Borrow {game.name}?
                <button className="close-modal" onClick={onClose}>
                    CLOSE
                </button>
            </div>
        </div>
    );
}
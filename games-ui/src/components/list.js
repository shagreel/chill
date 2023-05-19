import '../App.css';
import React, { useEffect, useState } from 'react';
import { BorrowModal } from "./borrow";

export const Game = (game, isActive, onShow, onClose) => {
    return (
        <tr>
            <td><img src={game.cover} className="cover"/></td>
            <td>
                <div className={`"title" ${game.borrowed ? 'borrowed' : ''}`} onClick={onShow}>{game.name}</div>
                {isActive && !game.borrowed && BorrowModal(game, onClose)}
            </td>
        </tr>
    );
};

export const List = () => {
    const [games, setGames] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const getGames = async () => {
            const resp = await fetch('https://games.shagreel.workers.dev/games/list');
            const gamesResp = await resp.json();
            setGames(gamesResp);
        };

        getGames();
    }, []);

    return (
        <div>
            <table className="game">
                {games.map(game => Game(game,
                    activeIndex === game.name,
                    () => setActiveIndex(game.name),
                    () => setActiveIndex(null)))}
            </table>
        </div>
    );
};
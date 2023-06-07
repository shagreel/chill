import '../App.css';
import React, { useEffect, useState } from 'react';
import { InteractionModal } from "./modal";
import Cookies from 'js-cookie';

export const Game = (game, onShow) => {
    return (
        <tr>
            <td><img src={game.cover} className="cover"/></td>
            <td>
                <div className={`title ${game.borrowed ? 'borrowed' : ''}`} onClick={onShow}>{game.name}</div>
            </td>
        </tr>
    );
};

export const List = () => {
    const [games, setGames] = useState([]);
    const [activeGame, setActiveGame] = useState(null);

    useEffect(() => {
        const getGames = async () => {
            const resp = await fetch('https://api.chill.ws/games/list',
                {
                    credentials: 'include',
                    headers: {'x-cfp': Cookies.get('CFP-Auth-Key')}
                });
            const gamesResp = await resp.json();
            setGames(gamesResp);
        };
        if (games.length === 0) {
            getGames();
        }
    }, []);

    return (
        <div>
            {activeGame && <InteractionModal game={activeGame} onClose={() => setActiveGame(null)}/>}
            <table className="game"><tbody>
            {games.map(game => Game(game,
                () => setActiveGame(game)))}
            </tbody></table>
        </div>
    );
};
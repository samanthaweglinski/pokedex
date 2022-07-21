import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../store/items";
import { deleteItemThunk } from "../store/items";

const PokemonItems = ({ pokemon, setEditItemId }) => {
  useEffect(() => {
    dispatch(fetchItems(pokemon.id));
  }, [pokemon.id]);

  const dispatch = useDispatch();
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map((itemId) => state.items[itemId]);
  });

  if (!items) {
    return null;
  }

  // const deleteHandler = () => {
  //   dispatch(deleteItemThunk(pokemon.id, item.id));
  // };

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>Edit</button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button
            value={item}
            onClick={() => {
              dispatch(deleteItemThunk(pokemon.id, item.id));
            }}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  ));
};

export default PokemonItems;

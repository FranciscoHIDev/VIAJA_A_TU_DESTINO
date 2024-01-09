import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { getAllUsers } from "../../redux/actions/actions";
import CardFavorite from "../../components/CardFavorite/CardFavorite";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Favorites() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(getAllUsers);
  }, [dispatch]);

  const myUser = allUsers?.find((u) => u.email === user?.email);
  const myFavorites = myUser?.favorites;

  return (
    <>
    <NavBar/>
    <main className="flex-grow pt-20 pb-40">
      <div className="flex  flex-col text-3xl text-black items-center">
        <div>
          <h1>¡Bienvenido al mejor buscador de ofertas de viajes!</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {myFavorites?.length > 0 ? (
            myFavorites?.map((e) => {
              return (
                <CardFavorite
                  key={crypto.randomUUID()}
                  _id={e._id}
                  title={e.title}
                  image={e.image}
                  category={e.category}
                  summary={e.summary}
                  promotion={e.promotion}
                  price={e.price}
                  availability={e.availability}
                  departure={e.departure}
                  arrival={e.arrival}
                  destination={e.destination}
                  author={e.author}
                  date={e.date}
                />
              );
            })
          ) : (
            <p>No hay favoritos agregados</p>
          )}
        </div>
      </div>
      </main>
      <Footer/>
    </>
  );
}

export default Favorites;

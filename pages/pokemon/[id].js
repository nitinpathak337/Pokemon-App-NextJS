import { gql } from "@apollo/client";
import client from "../../client";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import {IoIosArrowForward} from 'react-icons/io';
import Layout from "../../components/Layout";
import styles from "../../styles/pokemon.module.css";
import { useRouter } from "next/router";

//graphQL query to fetch pokemon's data bsed on id or name
const MY_QUERY = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

//graphQL query to fetch evolution data of a pokemon
const EVOLUTION_QUERY = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      number
      types
      image
      evolutions {
        id
        number
        name
        types
        image
      }
    }
  }
`;

//component to display  pokemon's details page
const Pokemon = ({ data }) => {
  const { pokemon } = data;

  //state for maintaining evolution data of a pokemon
  const [evolData, setEvolData] = useState(null);

  //using useRouter hook to get id from the url
  const router = useRouter();
  const id = router.query.id;

  //evolution button handler
  const fetchEvolutionData = async () => {
    const evolDataFetched = await client.query({
      query: EVOLUTION_QUERY,
      variables: { id },
    });

    setEvolData(evolDataFetched.data.pokemon);
    
  };

  return (
    <div>
      <Layout>
        <div className="min-vh-100 text-center p-5">
          <div>
            <div className="d-flex flex-row align-items-center justify-content-center mb-5">
              <h1 className="mx-1">{pokemon.name}</h1>
              <h1 className="mx-1 text-secondary">{`#${pokemon.number}`}</h1>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center ">
              <img
                src={`${pokemon.image}`}
                alt={`${pokemon.number}`}
                className={styles.pokemonImage}
              />
              <div className="mx-4">
                <div className="d-flex flex-row align-items-center bg-info p-3 border rounded my-3 justify-content-around">
                  <div className="mx-3">
                    <p className="m-0 text-white">Weight</p>
                    <h4 className="text-black">{pokemon.weight.maximum}</h4>
                  </div>
                  <div className="mx-3">
                    <p className="m-0 text-white">Height</p>
                    <h4 className="text-black">{pokemon.height.maximum}</h4>
                  </div>
                  <div className="mx-3">
                    <p className="m-0 text-white">Classification</p>
                    <h4 className="text-black">{pokemon.classification}</h4>
                  </div>
                </div>
                <div>
                  <h4 className="text-start text-secondary">Type</h4>
                  <ul className={styles.listContainer}>
                    {pokemon.types.map((each) => (
                      <li
                        key={each}
                        className={`${styles.listItem} ${styles.types}`}
                      >
                        {each}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-start text-secondary">Weaknesses</h4>
                  <ul className={styles.listContainer}>
                    {pokemon.weaknesses.map((each) => (
                      <li
                        key={each}
                        className={`${styles.listItem} ${styles.weaknesses}`}
                      >
                        {each}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-start text-secondary">Resistant</h4>
                  <ul className={styles.listContainer}>
                    {pokemon.resistant.map((each) => (
                      <li
                        key={each}
                        className={`${styles.listItem} ${styles.resistant}`}
                      >
                        {each}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Popup
            modal
            trigger={
              <button type="button" className="btn btn-success text-light my-4">
                Evolutions
              </button>
            }
            onOpen={fetchEvolutionData}
          >
            {(close) => (
              <div className={styles.popupContainer}>
                {evolData === null ? (
                  <h1 className="text-secondary">Loading</h1>
                ) : (
                  <div>
                    {evolData.evolutions === null ? (
                      <h1 className="text-secondary">This Pokemon has not evolved further</h1>
                    ) : (
                      <div className="d-flex flex-row align-items-center justify-content-center">
                        <div>
                          <img
                            src={evolData.image}
                            alt={evolData.number}
                            className={styles.popupImage}
                          />
                          <div className="d-flex justify-content-center">
                            <p>{evolData.name}</p>
                            <p className="text-secondary mx-1">{`#${evolData.number}`}</p>
                          </div>
                          <ul className={styles.popupTypes}>
                            {evolData.types.map((each) => (
                              <li key={each} className={styles.popupTypesItem}>{each}</li>
                            ))}
                          </ul>
                        </div>
                        <ul
                          className={`d-flex flex-row align-items-center justify-content-around ${styles.evolList}`}
                        >
                          {evolData.evolutions.map((each) => (
                            <li className="d-flex align-items-center">
                              <IoIosArrowForward size="80" color="darkblue"/>
                              <div>
                                <img
                                  src={each.image}
                                  alt={each.number}
                                  className={styles.popupImage}
                                />
                                <div className="d-flex justify-content-center">
                                  <p>{each.name}</p>
                                  <p className="text-secondary mx-1">{`#${each.number}`}</p>
                                </div>
                                <ul className={styles.popupTypes}>
                                  {each.types.map((eachItem) => (
                                    <li key={eachItem} className={styles.popupTypesItem}>{eachItem}</li>
                                  ))}
                                </ul>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            )}
          </Popup>
        </div>
      </Layout>
    </div>
  );
};

export default Pokemon;

//fetching single pokemon's data using SSR  
export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data } = await client.query({
    query: MY_QUERY,
    variables: { id },
  });

  return {
    props: { data },
  };
}

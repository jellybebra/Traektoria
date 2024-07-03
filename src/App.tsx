import {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios';
import formatMoney from "./formatMoney.ts";

function App() {
  const [data, setData] = useState([]);
  const [editingVehicleId, setEditingVehicleId] = useState();

  useEffect(() => {
    axios.get('https://test.tspb.su/test-task/vehicles')
      .then(r => setData(r.data))
      .catch(error => console.error("Ошибка при получении данных:", error));
  }, [])

  function sortByYear() {
    const sortedData = [...data].sort((a, b) => a.year - b.year);
    setData(sortedData);
  }

  function sortByPrice() {
    const sortedData = [...data].sort((a, b) => a.price - b.price);
    setData(sortedData);
  }

  function handleDelete(vehicleId) {
    const updatedData = data.filter(v => v.id !== vehicleId);
    setData(updatedData);
  }

  // Используя данные отрисовать компоненты объектов в виде карточек с полями.

  // Добавить возможность редактирования и удаления карточек на фронтенд части (изменение названия марки, модели и стоимости).

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
      <div className="top-buttons">
        <button onClick={sortByYear}>
          Отсортировать по году выпуска
        </button>
        <button onClick={sortByPrice}>
          Отсортировать по стоимости
        </button>
      </div>

      <div className="cards">
        {data.map((vehicle) => {
          return (
            <div className="card" key={vehicle.id}>
              {editingVehicleId === vehicle.id ?
                <>
                  <div className="card-content-editing">
                    <input type="text" id={`edit-name-${vehicle.id}`} defaultValue={vehicle.name}/>
                    <input type="text" id={`edit-model-${vehicle.id}`} defaultValue={vehicle.model}/>
                    <input type="number" id={`edit-price-${vehicle.id}`} defaultValue={vehicle.price}/>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => setEditingVehicleId(null)}>✖</button>
                    <button onClick={() => handleEditSave(vehicle.id)}>✔</button>
                  </div>
                </> :
                <>
                  <div className="card-content">
                    <div>
                      <h3>{vehicle.name} {vehicle.model}</h3>
                      <>{vehicle.year}, {vehicle.color}</>
                    </div>
                    <h3>{formatMoney(vehicle.price)} $</h3>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => setEditingVehicleId(vehicle.id)}>
                      📝
                    </button>
                    <button onClick={() => handleDelete(vehicle.id)}>
                      🗑️
                    </button>
                  </div>
                </>
              }
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${vehicle.longitude}%2C${vehicle.latitude}&mode=search&sll=${vehicle.longitude}%2C${vehicle.latitude}&text=${vehicle.latitude}%2C${vehicle.longitude}&z=12.33`}
                width="300" height="300" allowFullScreen={true}
              >
              </iframe>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App

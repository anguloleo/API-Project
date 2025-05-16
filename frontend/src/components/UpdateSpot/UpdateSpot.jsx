import {useState, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom';
import { fetchSpot, editSpot } from '../../store/spotReducer';
import './UpdateSpot.css';


const UpdateSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const spot = useSelector(state => state.spotState.entries[id]);

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchSpot(id)); }, [dispatch, id]);

    useEffect(() => {
    if (spot) {
      setCountry(spot.country || '');
      setAddress(spot.address || '');
      setCity(spot.city || '');
      setState(spot.state || '');
      setLat(spot.lat || '');
      setLng(spot.lng || '');
      setDescription(spot.description || '');
      setName(spot.name || '');
      setPrice(spot.price || '');
    }
  }, [spot]);


    const handleSubmit = async (e) => {
        e.preventDefault();

    const newErrors = {};

    if (!country) newErrors.country = 'Country is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    if (!description || description.length < 30)
        newErrors.description = 'Description needs 30 or more characters';
    if (!name) newErrors.name = 'Name is required';
    if (!price) newErrors.price = 'Price per night is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }

        const updatedSpot = {
            id,
            country,
            address,
            city,
            state,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            description,
            name,
            price: parseFloat(price),
        };

    try {
      const result = await dispatch(editSpot(updatedSpot));
      if (result?.id) {
        navigate(`/spots/${result.id}`);
      }
    } catch (err) {
      console.error('Failed to update spot:', err);
    }
  };

  if (!spot) return <p>Loading...</p>;


    return(
        <div className="inputBox">

        <h1>Update your Spot</h1>

        {/* FORM BEGINS*/}
        <form onSubmit={handleSubmit}>
        
        <div className='form-section'>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they book a reservation.</p>
        
        {/*COUNTRY*/}
        <label>Country</label>
        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />
        {errors.country && <p className='error'>{errors.country}</p>}
        
        {/*ADDRESS*/}
        <label>Street Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
          {errors.address && <p className='error'>{errors.address}</p>}
        </div>
        
        <div className='location-row'>
        {/*CITY*/}
            <div>
                <label>City</label>
                <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
            </div>
        {/*STATE*/}
            <div>
            <label>State</label>
            <input value={state} onChange={e => setState(e.target.value)} placeholder="State" />
            </div>
        </div>
        {/*LATITUDE*/}
        <div className='coordinates-row'>
            <div>
            <label>Latitude</label>
            <input type="number" value={lat} onChange={e => setLat(e.target.value)} placeholder="Latitude"/>
            </div>
        {/*LONGITUDE*/}
            <div>
            <label>Longitude</label>
            <input type="number" value={lng} onChange={e => setLng(e.target.value)} placeholder="Longitude"/>
            </div>
        </div>
        
        {/*DESCRIPTION*/}
        <div className='form-section'>
            <h2>Describe you place to guests</h2>
            <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Please write at least 30 characters" />
            {errors.description && <p className='error'>{errors.description}</p>}
        </div>
        
        {/*NAME*/}
        <div className='form-section'>
            <h2>Create a title for your spot</h2>
            <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name of your spot" />
            {errors.name && <p className='error'>{errors.name}</p>}
        </div>
        
        {/*PRICE*/}
        <div className='form-section'>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <div className="price-container">
            <span>$</span>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price per night (USD)" />
            </div>
            {errors.price && <p className='error'>{errors.price}</p>}
        </div>
       
        <button type="submit">Update Spot</button>
      </form>
    </div>
    );
};

export default UpdateSpot;
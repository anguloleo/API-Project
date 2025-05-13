import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {createSpot} from '../../store/spotReducer';
import './CreateSpot.css';


const CreateSpot = () => {
    const dispatch = useDispatch();

    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot = {
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

        const spot = await dispatch(createSpot(newSpot));
        if(spot) reset();
    };

    const reset = () => {
            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setLat('');
            setLng('');
            setDescription('');
            setName('');
            setPrice('');
            setImage1('');
            setImage2('');
            setImage3('');
            setImage4('');
            setImage5('');
    };


    return(
        <div className="inputBox">
        <h1>Create a new Spot</h1>

        {/* FORM BEGINS*/}
        <form onSubmit={handleSubmit}>
        
        <div className='form-section'>
            <h2>Where&apos;s your place located?</h2>
            <p>Guests will only get your exact address once they book a reservation.</p>
        
        {/*COUNTRY*/}
        <label>Country</label>
        <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" required />
        
        {/*ADDRESS*/}
        <label>Street Address</label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
        </div>
        
        <div className='location-row'>
        {/*CITY*/}
            <div>
                <label>City</label>
                <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" required />
            </div>
        {/*STATE*/}
            <div>
            <label>State</label>
            <input value={state} onChange={e => setState(e.target.value)} placeholder="State" required />
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
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Please write at least 30 characters" required />
        </div>
        
        {/*NAME*/}
        <div className='form-section'>
            <h2>Create a title for your spot</h2>
            <p>Catch guest&apos;s attention with a spot title that highlights what makes your place special.</p>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name of your spot" required />
        </div>
        
        {/*PRICE*/}
        <div className='form-section'>
            <h2>Set a base price for your spot</h2>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <div className="price-container">
            <span>$</span>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price per night (USD)" required />
        </div>
        </div>
       
       {/*IMAGE*/}
        <div className='form-section'>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
        
        <input value={image1} onChange={e => setImage1(e.target.value)} placeholder="Preview Image URL" required />
        <input value={image2} onChange={e => setImage2(e.target.value)} placeholder="Image URL" />
        <input value={image3} onChange={e => setImage3(e.target.value)} placeholder="Image URL" />
        <input value={image4} onChange={e => setImage4(e.target.value)} placeholder="Image URL" />
        <input value={image5} onChange={e => setImage5(e.target.value)} placeholder="Image URL" />
        </div>

        <button type="submit">Create Spot</button>
        
      </form>
    </div>
    );
};

export default CreateSpot;
import {useState} from 'react'

function OrderForm() {

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Garment",
  });

  function handleEvent(e){
    setForm({...form, 
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(form);
    alert(`Order submitted for ${form.name} in ${form.area}`);
  }

  return (
    <div className='orde-form'>
      <h2>Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name: <input 
            name="name"
            value={form.name}
            onChange={handleEvent}
            type='text'
            placeholder='Your Name'
          />
        </label>
        
        <label htmlFor='phone'>
          Phone: <input 
            name="phone"
            value={form.phone}
            onChange={handleEvent}
            type='tel' 
            placeholder='Your Phone No.'
          /> 
        </label>
        
        <label htmlFor='area'>
          Area: <select name="area" value={form.area} onChange={handleEvent}>
            <option value="Garment">Garment</option>
            <option value="Mekanisa">Mekanisa</option>
            <option value="Abo">Abo</option>
            <option value="Sar-Bet">Sar-Bet</option>
            <option value="Mexico">Mexico</option>
          </select>
        </label>
        
        <br></br>
        <button type='submit'>submit</button>
      </form>
    </div>
  );
}

export default OrderForm

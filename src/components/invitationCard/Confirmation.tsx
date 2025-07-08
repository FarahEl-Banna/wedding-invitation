
import SealND from '../SealND'
import headimg from '../../assets/icons/flower&note.svg'
import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/plain.css';
import { useState, useEffect } from 'react';

type ConfirmationProps = {
  name: string;
  invited_count: number;
  phone: string;
};

export default function Confirmation({name, invited_count,phone}:ConfirmationProps) {

  const [attending, setAttending] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [showPopup, setShowPopup] = useState<"message" | "confirmation" | null>
  (null);
  const [popUpMsg, setPopUpMsg] = useState('')



  const submitFinalRSVP = async ({guests}:{ guests: number }) => {
    // console.log('Submitting RSVP:', { guestName, phone, attending, guests });
  const res = await fetch('http://localhost:4000/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guestName,
      phone,
      attending: attending === true,
      guests: guests,
    }),
  });

  const data = await res.json();
  console.log(data.message);
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPhone.length < 8 || inputPhone.length > 15) {
      alert("Invalid phone number length");
      return;
    }
    // const res = await fetch(`http://localhost:4000/api/check-phone?phone=${encodeURIComponent(phone)}`)
    
  try {
    if (inputPhone!=phone) {
      // throw new Error('Phone not found');
      setShowPopup("message")
      setPopUpMsg('Please enter the phone number you were invited with..');
      throw new Error('Phone not found');
    }
    if (attending === false){
        submitFinalRSVP({guests:0});
         setShowPopup("message");
         setPopUpMsg(`Your presence will be deeply missed!`);
      }
      else{
    if (invited_count === 1) {
      // Single attendee: just ask for name
      submitFinalRSVP({guests:1});
      setShowPopup("message");
      setPopUpMsg(`Thank you ${guestName}, your RSVP has been recorded!`);
    }
      else {
      setShowPopup("confirmation");
      setPopUpMsg(`Number of attendees!`);
      }
    }
    }
   catch (err) {
    console.error(err);
    // setError('Invalid phone number or not invited.');
  }
  };

  const handleConfirm = (value: string) => {
    console.log("User selected:", value);
    submitFinalRSVP({guests: value === '1' ? 1 : invited_count});
  };

  return (
    <section className="section-style">
        <SealND />
        {/* Heading */}
      <h3 className="border-y-2 text-3xl p-3 px-8">Will you join us on this Special Evening for the Party?</h3>
      <div className='flex flex-col md:flex-row-reverse w-full justify-center items-center gap-4 md:gap-8 p-4'>
      <img src={headimg} alt="head image" loading="lazy" className="aspect-square w-1/2 max-w-64"/>
      <form  onSubmit={handleSubmit}
      className="flex flex-col items-start space-y-4 text-md md:text-2xl" >
        
        <label >
        <input
          type="radio"
          name="attendance"
          value='yes'
          checked={attending== true}
          onChange={() => setAttending(true)}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2 font-">I will Attend</span>
        </label>
      <label>
        <input
          type="radio"
          name="attendance"
          value='no'
          checked={attending== false}
          onChange={() => setAttending(false)}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2">Unfortunately I can not :(</span>
        </label>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full max-w-xs p-2 border-b-2 border-text rounded placeholder:text-text/70 dark:border-text-dark dark:placeholder:text-text-dark/70"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <PhoneInput
        country={'lb'} // default country (Lebanon in this case)
        value={inputPhone}
        onChange={(value) => setInputPhone(value)}
        inputStyle={{ width: '100%' }}
        containerClass="w-full p-2 border-b-2 border-text rounded placeholder:text-text/70 dark:border-text-dark dark:placeholder:text-text-dark/70"
        containerStyle={{ width: '100%' ,background: ''}}
        dropdownStyle={{ background: ""}}
        inputProps={{
    name: 'phone',
    required: true,
    // autoFocus: true
  }}
      />
        
        <button
          type="submit"
          // onClick={handlePhoneSubmit}
          className="px-6 py-2  text-text border-accent border-2 dark:border-accent-dark dark:text-text-dark rounded-4xl hover:bg-accent/50 dark:hover:bg-accent-dark/50 transition-colors"
        >
          Confirm Attendance
        </button>
      </form>

       {showPopup && (
        <PopUp
          type={showPopup}
          message={popUpMsg}
          onConfirm={handleConfirm}
          onClose={() => setShowPopup(null)}
        />
      )}
      </div>
    </section>  
  );
}


type PopupProps = {
  type: "message" | "confirmation";
  message: string;
  onConfirm?: (value: string) => void; // for confirmation
  onClose?: () => void;                // optional external close
};

function PopUp({ type, message, onConfirm, onClose }: PopupProps) {
 const [visible, setVisible] = useState(true);
  const [selection, setSelection] = useState("");

  useEffect(() => {
    if (type === "message") {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  const handleConfirm = () => {
    if (!selection) return; 
    onConfirm?.(selection);
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;


  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
    <div className="aspect-square p-5 w-1/3 bg-primary dark:bg-primary-dark rounded-4xl flex flex-col items-center justify-center text-text dark:text-text-dark ">
        <img src={headimg} alt="head image" loading="lazy" className="aspect-square w-1/2 max-w-64"/>
        <p className='border-accent border-b-2 text-2xl'>{message}</p>
         {type === "confirmation" && <div className='flex flex-col items-stretch space-y-4 text-md mt-4'>
          <label >
        <input
          type="radio"
          name="attendance"
          value='1'
          checked={selection== '1'}
          onChange={() => setSelection('1')}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2 font-">I am attending alone</span>
        </label>
      <label>
        <input
          type="radio"
          name="attendance"
          value='2'
          checked={selection== '2'}
          onChange={() => setSelection('2')}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2">I am attending with the family</span>
        </label>

        <button
        disabled={!selection}
           onClick={handleConfirm}
          className="px-6 py-2  text-text border-accent border-2 dark:border-accent-dark dark:text-text-dark rounded-4xl hover:bg-accent/50 dark:hover:bg-accent-dark/50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Confirm
        </button>
          </div>}
     </div>
     </div>
  );
}
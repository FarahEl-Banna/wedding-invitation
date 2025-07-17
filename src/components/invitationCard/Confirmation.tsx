
import SealND from '../SealND'
import headimg from '../../assets/icons/flower&note.svg'
import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/plain.css';
import { useState, useEffect } from 'react';

type ConfirmationProps = {
  invited_count: number;
  phone: string;
};

export default function Confirmation({invited_count,phone}:ConfirmationProps) {

  const [attending, setAttending] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [showPopup, setShowPopup] = useState<"message" | "confirmation" | null>
  (null);
  const [popUpMsg, setPopUpMsg] = useState<{mgs:string,invited_count?:number}>({mgs: '', invited_count: 0});



  const submitFinalRSVP = async ({guests}:{ guests: number }) => {

    const url = import.meta.env.VITE_API_URL ||  'http://localhost:4000';
 
  const res = await fetch(`${url}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guestName,
      phone,
      attending: attending === true,
      guests: guests,
    }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error('Error submitting RSVP:', errorData.message);
    throw new Error(errorData.message || 'Failed to submit RSVP');
  }
   const data = await res.json();
  if( res.status == 202) {
    setShowPopup("message");
    setPopUpMsg({mgs:`Thank you ${guestName}, your RSVP has been recorded!`});

  }
  else if (res.status==200) {
     setShowPopup("message");
    setPopUpMsg({mgs:`Your presence will be deeply missed!`});
  
  } else {
    console.error('Error submitting RSVP:', data.message);
  }
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
      setShowPopup("message")
      setPopUpMsg({mgs:'Please enter the phone number you were invited with..'});
      throw new Error('Phone not found');
    }
    if (attending === false){
        submitFinalRSVP({guests:0});
      }
      else{
    if (invited_count === 1) {
      // Single attendee: just ask for name
      submitFinalRSVP({guests:1});
    }
      else {
      setShowPopup("confirmation");
      setPopUpMsg({mgs:`Number of attendees!`, invited_count: invited_count});
      }
    }
    }
   catch (err) {
    console.error(err);
  }
  };

  const handleConfirm = (value: string) => {
    console.log("User selected:", value);
    submitFinalRSVP({guests: parseInt(value)});
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
  }}
      />
        
        <button
          type="submit"
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
  message: {mgs:string,invited_count?:number};
  onConfirm?: (value: string) => void; // for confirmation
  onClose?: () => void;                // optional external close
};

function PopUp({ type, message, onConfirm, onClose }: PopupProps) {
 const [visible, setVisible] = useState(true);
  const [selection, setSelection] = useState("");
const [selectionOptions, setSelectionOptions] = useState<string[]>([]);

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

  useEffect(() => {
    if (type === "confirmation" ) {
      if (message.invited_count) {
      const options = Array.from({ length: message.invited_count-1 }, (_, i) => (i+2).toString());
      setSelectionOptions(options);
    }
  }},[])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
    <div className="aspect-square p-5 w-2/3 md:w-1/3 bg-primary dark:bg-primary-dark rounded-4xl flex flex-col items-center justify-center text-text dark:text-text-dark ">
        <img src={headimg} alt="head image" loading="lazy" className="aspect-square w-1/2 max-w-64"/>
        <p className='border-accent border-b-2 text-2xl'>{message.mgs}</p>
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
      {message.invited_count==2?<label>
        <input
          type="radio"
          name="attendance"
          value='2'
          checked={selection== '2'}
          onChange={() => setSelection('2')}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2">I am attending with the my partner</span>
        </label>:
        selectionOptions.map((options)=><label key={options}>
        <input
          type="radio"
          name="attendance"
          value={options}
          checked={selection== options}
          onChange={() => setSelection(`${options}`)}
          className="accent-accent dark:accent-accent-dark"
        /><span className="ml-2">{options} family members are attending</span>
        </label>)
        }

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
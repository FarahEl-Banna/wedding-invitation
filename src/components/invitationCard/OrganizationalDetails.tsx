import SealND from '../SealND'


export default function OrganizationalDetails() {
    return (
      <section className="section-style">
        <SealND/>
        <h3 className="border-y-2 p-3 text-3xl">Share your Wedding Photos and Videos here</h3>

          <p >
          We don’t want to miss any moment of this beautiful day
          </p>
          <div className="aspect-square w-1/2 bg-accent/70 rounded-md flex items-center justify-center">
            A place for your photo
          </div>
          <p >
          Scan The QR Code and upload your photos
          </p>
          <button className="border-2 border-accent text-text dark:text-text-dark w-full px-4 py-2 rounded-4xl hover:bg-accent/70 transition-colors">
            Upload Photos
          </button>

      </section>
    );
  }
  
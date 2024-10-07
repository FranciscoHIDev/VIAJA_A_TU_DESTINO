import React, { useEffect } from 'react';

const BookerWidget = () => {
  useEffect(() => {
    const hash = window.location.hash.substring(1).trim();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    
    let mainScriptUrl = "//widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=";
    
    if (hash) {
      // Si hay un hash, se ajusta el URL según el hash
      const currentSection = hash === '8' ? '8' : hash === '9' ? '9' : '{}';
      script.src = `${mainScriptUrl}true&CurrentSection=${currentSection}&CurrentEngine=${hash === '8' ? '9' : hash === '9' ? '10' : ''}&ShowProducts=true&ShowHiddenTabs=true&IsHorizontal=true`;
    } else {
      // Sin hash
      script.src = `${mainScriptUrl}false&IsHorizontal=true`;
    }
    
    script.id = 'main_booker';
    document.getElementsByTagName('head')[0].appendChild(script);
    
    // Manejo de clase 'current'
    const idHash = `#s${hash}`;
    if (hash === "") {
      document.querySelector('#s3').classList.add('current');
    } else {
      document.querySelector(idHash).classList.add('current');
    }

    // Cleanup function para eliminar el script si el componente se desmonta
    return () => {
      const existingScript = document.getElementById('main_booker');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div id="ptw-container" className="ptw-horizontal-search bookerContainer"></div>
  );
};

export default BookerWidget;

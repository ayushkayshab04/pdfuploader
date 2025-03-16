import { useState } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import PdfUploadViewer from './components/pdfUploadViewer';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function App() {
  const [pdfUrl, setPdfUrl] = useState("");

  return (
    <div className="App">
        {!pdfUrl&&<h2>PDF chat Assistant</h2>}      
        <div style={{
          display:pdfUrl&&'flex',
          margin:'0 auto',
          justifyContent:'space-between',
          paddingRight:'50px'
        }}>
        <PdfUploadViewer pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} />
        {pdfUrl && <ChatInterface pdfUrl={pdfUrl} />}
      </div>
    </div>
  );
}

export default App;

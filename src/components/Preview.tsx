import { useEffect, useRef } from "react";

import "./Preview.css";

interface PreviewProps {
  code: string;
}

const html = `
<html>

<head>
  <style>html {background-color: white}</style>
</head>

<body>
    <div id='root'></div>
    <script>
        window.addEventListener('message', (event) => {
            try {
                eval(event.data);
            } catch (err) {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>' + err + '</div>'
                console.error(err);
            }
        }, false)
    </script>
</body>

</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    /*
    If we replace the inner HTML of our iframe, the content is printed but then the message
    we post is received and it erases everything
    A timeout avoid this problem
    */
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;

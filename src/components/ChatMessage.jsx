const ChatMessage = ({ message }) => {
    const navigateToPage = (pageNumber) => {
      document.getElementById(`page-${pageNumber}`)?.scrollIntoView({ behavior: "smooth" });
    };
  
    return (
      <p>
        {message.split(/\[Page (\d+)\]/).map((part, i) =>
          /^\d+$/.test(part) ? (
            <button key={i} onClick={() => navigateToPage(Number(part))}>
              Go to Page {part}
            </button>
          ) : (
            part
          )
        )}
      </p>
    );
  };
  
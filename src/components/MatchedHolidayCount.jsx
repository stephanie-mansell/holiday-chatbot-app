function MatchedHolidayCount(props) {
  if (props.length <= 0) {
    return null;
  } else {
    const length = props.length;

    const holidayLength =
      length > 1 ? (
        <div className="match-bubble" data-testid="holiday-length-test">
          I matched you with {length} holidays!
        </div>
      ) : (
        <div className="match-bubble" data-testid="holiday-length-test">
          I matched you with {length} holiday!
        </div>
      );
    return holidayLength;
  }
}

export default MatchedHolidayCount;

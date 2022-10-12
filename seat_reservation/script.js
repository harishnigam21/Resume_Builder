class App extends React.Component {

  constructor() {
    super();
    this.state = {
      seat: [
      'Front1', 'Front2', 'Front3',
      'Middle1', 'Middle2', 'Middle3',
      'Back1', 'Back2', 'Back3'],

      seatAvailable: [
      'Front1', 'Front2', 'Front3',
      'Middle1', 'Middle2', 'Middle3',
      'Back1', 'Back2', 'Back3'],

      seatReserved: [] };

  }

  onClickData(seat) {
    if (this.state.seatReserved.indexOf(seat) > -1) {
      this.setState({
        seatAvailable: this.state.seatAvailable.concat(seat),
        seatReserved: this.state.seatReserved.filter(res => res != seat) });

    } else {
      this.setState({
        seatReserved: this.state.seatReserved.concat(seat),
        seatAvailable: this.state.seatAvailable.filter(res => res != seat) });

    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", null, "Seat Reservation System"), /*#__PURE__*/
      React.createElement(DrawGrid, {
        seat: this.state.seat,
        available: this.state.seatAvailable,
        reserved: this.state.seatReserved,
        onClickData: this.onClickData.bind(this) })));



  }}


class DrawGrid extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement("h2", null), /*#__PURE__*/
      React.createElement("table", { className: "grid" }, /*#__PURE__*/
      React.createElement("tbody", null, /*#__PURE__*/
      React.createElement("tr", null,
      this.props.seat.map((row) => /*#__PURE__*/
      React.createElement("td", {
        className: this.props.reserved.indexOf(row) > -1 ? 'reserved' : 'available',
        key: row, onClick: e => this.onClickSeat(row) }, row, " "))))), /*#__PURE__*/




      React.createElement(AvailableList, { available: this.props.available }), /*#__PURE__*/
      React.createElement(ReservedList, { reserved: this.props.reserved })));


  }

  onClickSeat(seat) {
    this.props.onClickData(seat);
  }}


class AvailableList extends React.Component {
  render() {
    const seatCount = this.props.available.length;
    return /*#__PURE__*/(
      React.createElement("div", { className: "left" }, /*#__PURE__*/
      React.createElement("h4", null, "Available Seats: (", seatCount == 0 ? 'No seats available' : seatCount, ")"), /*#__PURE__*/
      React.createElement("ul", null,
      this.props.available.map(res => /*#__PURE__*/React.createElement("li", { key: res }, res)))));



  }}


class ReservedList extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "right" }, /*#__PURE__*/
      React.createElement("h4", null, "Reserved Seats: (", this.props.reserved.length, ")"), /*#__PURE__*/
      React.createElement("ul", null,
      this.props.reserved.map(res => /*#__PURE__*/React.createElement("li", { key: res }, res)))));



  }}



ReactDOM.render( /*#__PURE__*/React.createElement(App, { name: "Rachelle" }), document.getElementById('app'));
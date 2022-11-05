import './Tracks.css';

export class Tracks extends React.Component {

    renderAction() {
        const buttonValue = isRemoval ? "-" : "+";
        return <button className="Track-action">{buttonValue}</button>
    }

    render() {
        return (
            <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist}| {this.props.track.album}</p>
  </div>
  <button className="Track-action">{this.props.track.action} </button>
</div>
        )
    }
}
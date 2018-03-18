import React, { Component } from "react";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import "bulma/css/bulma.css";
import "./App.css";
import phone from "./iphone_flat.png";
import title from "./story_title.png";

const CLOUDINARY_BASE = `http://res.cloudinary.com/dqvqfldvv/image/upload`;

class App extends Component {
  state = {
    showImage: false,
    showVideo: false,
    imgPath: null,
    publicId: null
  };
  uploadWidget(event) {
    event.preventDefault();
    let that = this;
    try {
      window.cloudinary.openUploadWidget(
        {
          cloud_name: "dqvqfldvv",
          upload_preset: "distll_preset",
          tags: ["Distll"],
          sources: ["local", "url", "instagram", "facebook"],
          theme: "white",
          cropping: "custom",
          cropping_aspect_ratio: 0.5,
          cropping_default_selection_ratio: 0.5
        },
        (error, result) => {
          console.log("RESULT", result);
          if (result[0].video) {
            that.setVideo(result);
          }
          if (result[0].url) {
            that.setImage(result);
          }
        }
      );
    } catch (err) {
      console.error("openUploadWidget", err);
    }
  }

  setVideo(resp) {
    console.log("set Image called", resp[0].url);
    this.setState({
      showVideo: true,
      publicId: resp[0].public_id
    });
  }

  setImage(resp) {
    console.log("set Image called", resp[0].url);
    this.setState({
      showImage: true,
      imgPath: resp[0].path,
      publicId: resp[0].public_id
    });
  }
  deleteMedia = e => {
    e.preventDefault();
    this.setState({
      showImage: false,
      showVideo: false,
      publicId: null
    });
  };
  render() {
    const { showImage, showVideo, imgPath, publicId } = this.state;
    return (
      <div className="App">
        <div className="preview-wrapper">
          <div className="preview-form">
            <div className="step">1</div>
            <button
              onClick={this.uploadWidget.bind(this)}
              className="button is-info is-medium is-outlined"
            >
              Upload Media
            </button>
            <div className="step">2</div>
            <div className="field">
              <label className="label">Story Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="e.g Alex Smith"
                />
              </div>
            </div>
            <div className="step">3</div>
            <div className="field">
              <label className="label">Story Description</label>
              <div className="control">
                <textarea className="textarea" />
              </div>
            </div>
            <div className="step">4</div>
            <button
              onClick={this.uploadWidget.bind(this)}
              className="button is-primary is-medium"
              disabled={!showImage}
            >
              Submit Story
            </button>
          </div>
          <div
            className="phone-wrapper"
            style={{ backgroundImage: `url(${phone})` }}
          >
            <div className="preview-screen">
              {(showImage || showVideo) && (
                <button className="delete-media" onClick={this.deleteMedia}>
                  <i className="ion-android-close" />
                </button>
              )}

              <CloudinaryContext cloudName="dqvqfldvv">
                {showImage && (
                  <Image publicId={publicId} width={280}>
                    <Transformation gravity="custom" crop="crop" />
                  </Image>
                )}
                {showVideo && (
                  <Video
                    width={280}
                    controls="controls"
                    publicId={publicId}
                    fallback="Cannot display video"
                  />
                )}
              </CloudinaryContext>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

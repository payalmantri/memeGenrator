import { Component, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  @ViewChild('memesCanvas', { static: false }) myCanvas;
  topText = '';
  bottomText = '';
  imageContent = '';
  canvasBackgroundColour = '#f9f9fd';
  canvasTextColour = '#000000';

  constructor() { }

  ngOnInit(): void {
  }

  previewImage(e: any): void {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const render = new FileReader();
    render.readAsDataURL(e.target.files[0]);
    render.onload = (event) => {
      this.imageContent = event.target.result as string;
      this.dispalyImage(ctx);
    };
  }

  private dispalyImage(ctx: any) {
    const image = new Image();
    image.src = this.imageContent;
    image.onload = () => {
      ctx.drawImage(image, 50, 150, 600, 500);
    };
  }

  drawText(): void {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.canvasBackgroundColour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.dispalyImage(ctx);
    ctx.fillStyle = this.canvasTextColour;
    ctx.font = ' 30px Comic Sans Ms';
    ctx.textAlign = 'center';
    ctx.fillText(this.topText, canvas.width / 2, 100);
    ctx.fillText(this.bottomText, canvas.width / 2, 750);
  }

  setCanvasBackgroundColor($event: ColorEvent) {
    this.canvasBackgroundColour = $event.color.hex;
    this.drawText();
  }

  setCanvasTextColor($event: ColorEvent) {
    this.canvasTextColour = $event.color.hex;
    this.drawText();
  }

  downloadImage() {
    const canvas = this.myCanvas.nativeElement;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = image;
    link.click();
  }

}

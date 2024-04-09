import { useContext, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { Context } from '../../context';

const index = () => {
	const $canvasRef = useRef<HTMLCanvasElement>(null);
	const ctx = useContext(Context);

	useEffect(() => {
		if ($canvasRef.current) {
			initDraw($canvasRef.current);
		}
	}, []);

	useEffect(() => {
		if (ctx && ctx.inputLetters && ctx.inputLetters.wrong) {
			const errors = ctx.inputLetters.wrong.length;
			const context = $canvasRef.current!.getContext('2d')!;

			switch (errors) {
				case 1:
					drawHead(context);
					break;

				case 2:
					drawBody(context);
					break;

				case 3:
					drawLeftArm(context);
					break;

				case 4:
					drawRightArm(context);
					break;

				case 5:
					drawLeftLeg(context);
					break;

				case 6:
					drawRightLeg(context);
					drawBlood(context);
					drawFaceDead(context);
					break;

				default:
					break;
			}
		}
	}, [ctx]);

	return (
		<div className={styles.container}>
			<canvas
				id="drawing-person"
				className={styles.canvas}
				ref={$canvasRef}
			></canvas>
		</div>
	);
};

export default index;

function initDraw($canvas: HTMLCanvasElement) {
	const ctx = $canvas.getContext('2d')!;

	const drawStructure = () => {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#1ef602';

		ctx.moveTo(25, 140);
		ctx.lineTo(75, 140);
		ctx.moveTo(35, 143);
		ctx.lineTo(65, 143);

		ctx.moveTo(50, 140);
		ctx.lineTo(50, 10);
		ctx.lineTo(150, 10);
		ctx.lineTo(150, 20);

		ctx.stroke();
		ctx.closePath();
	};

	drawStructure();
}

function drawHead(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 1;

	// face
	ctx.strokeStyle = '#ffa303';
	ctx.arc(150, 30, 10, 0, Math.PI * 2);

	// eyes
	ctx.moveTo(147, 27);
	ctx.arc(147, 27, 1, 0, Math.PI * 1);
	ctx.moveTo(153, 27);
	ctx.arc(153, 27, 1, 0, Math.PI * 1);

	// mouth scared
	ctx.moveTo(147, 33);
	ctx.lineTo(153, 33);

	ctx.stroke();
	ctx.closePath();
}

function drawBody(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#0389ff';
	ctx.moveTo(150, 40);
	ctx.lineTo(150, 80);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftArm(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#00ffe1';
	ctx.moveTo(150, 45);
	ctx.lineTo(135, 60);
	ctx.stroke();
	ctx.closePath();
}

function drawRightArm(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#ff00c8';
	ctx.moveTo(150, 45);
	ctx.lineTo(165, 60);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftLeg(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#1900ff';
	ctx.moveTo(150, 80);
	ctx.lineTo(140, 110);
	ctx.lineTo(135, 110);
	ctx.stroke();
	ctx.closePath();
}
function drawRightLeg(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#ffea00';
	ctx.moveTo(150, 80);
	ctx.lineTo(160, 110);
	ctx.lineTo(165, 110);
	ctx.stroke();
	ctx.closePath();
}

function drawBlood(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#ff0000';

	ctx.moveTo(150, 40);
	ctx.lineTo(150, 45);

	ctx.moveTo(145, 50);
	ctx.lineTo(145, 55);

	ctx.moveTo(155, 60);
	ctx.lineTo(155, 65);

	ctx.moveTo(150, 70);
	ctx.lineTo(150, 75);

	ctx.moveTo(145, 80);
	ctx.lineTo(145, 85);

	ctx.moveTo(155, 90);
	ctx.lineTo(155, 95);

	ctx.moveTo(150, 100);
	ctx.lineTo(150, 105);

	ctx.moveTo(145, 110);
	ctx.lineTo(145, 112);

	ctx.moveTo(155, 112);
	ctx.lineTo(155, 112);

	ctx.moveTo(150, 115);
	ctx.lineTo(150, 115);

	ctx.moveTo(145, 118);
	ctx.lineTo(145, 118);

	ctx.stroke();
	ctx.closePath();
}

function drawFaceDead(ctx: CanvasRenderingContext2D) {
	ctx.beginPath();
	ctx.lineWidth = 1;

	// face
	ctx.strokeStyle = '#ff2d03';
	ctx.arc(150, 30, 10, 0, Math.PI * 2);

	// eyes
	ctx.moveTo(147, 27);
	ctx.arc(147, 27, 1, 0, Math.PI * 1);
	ctx.moveTo(153, 27);
	ctx.arc(153, 27, 1, 0, Math.PI * 1);

	// mouth sad
	ctx.moveTo(147, 35);
	ctx.quadraticCurveTo(147, 30, 155, 35);

	ctx.stroke();
	ctx.closePath();
}

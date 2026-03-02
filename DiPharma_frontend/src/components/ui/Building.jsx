import './Building.css';

/**
 * Building Component - A 3D isometric rectangular building
 * 
 * @param {Object} props
 * @param {number} props.width - Width of the building in pixels (default: 80)
 * @param {number} props.height - Height of the building in pixels (default: 150)
 * @param {number} props.depth - Depth of the building in pixels (default: 80)
 * @param {string} props.color - Base color for the building (optional)
 */
function Building({
    width = 80,
    height = 100,
    depth = 80,
    color
}) {
    // Calculate styles for each face
    const frontStyle = {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translateZ(${depth / 2}px)`,
        ...(color && {
            background: `linear-gradient(180deg, ${color} 0%, ${adjustBrightness(color, -10)} 100%)`
        })
    };

    const sideStyle = {
        width: `${depth}px`,
        height: `${height}px`,
        transform: `rotateY(90deg) translateZ(${width / 2}px)`,
        ...(color && {
            background: `linear-gradient(180deg, ${adjustBrightness(color, -20)} 0%, ${adjustBrightness(color, -35)} 100%)`
        })
    };

    const topStyle = {
        width: `${depth}px`,
        height: `${width}px`,
        transform: `rotateX(90deg) translateZ(${height / 2.48}px)`, // Corrected from /2.4 to /2 for standard 3D positioning
        ...(color && {
            background: `linear-gradient(135deg, ${adjustBrightness(color, 15)} 0%, ${adjustBrightness(color, 5)} 100%)`
        })
    };

    // Optional: Adapt stripe colors if custom color provided (for consistency)
    const frontStripeColor = color ? adjustBrightness(color, -5) : '#3d6a99';
    const sideStripeColor = color ? adjustBrightness(color, -15) : '#2d5a89';

    const containerStyle = color ? {
        '--front-stripe': frontStripeColor,
        '--side-stripe': sideStripeColor,
    } : {};

    return (
        <div className="building-container" style={containerStyle}>
            <div className="building">
                <div className="building-front" style={frontStyle} />
                <div className="building-side" style={sideStyle} />
                <div className="building-top" style={topStyle} />
            </div>
        </div>
    );
}

/**
 * Utility function to adjust color brightness
 * @param {string} hex - Hex color code
 * @param {number} percent - Percentage to adjust (-100 to 100)
 */
function adjustBrightness(hex, percent) {
    // Remove # if present
    hex = hex.replace(/^#/, '');

    // Parse hex to RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Adjust brightness
    r = Math.min(255, Math.max(0, r + (r * percent / 100)));
    g = Math.min(255, Math.max(0, g + (g * percent / 100)));
    b = Math.min(255, Math.max(0, b + (b * percent / 100)));

    // Convert back to hex
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

export default Building;
export interface CollisionElement {
  element: HTMLElement;
  id: string;
  priority: number;
  accumulationArea: "top" | "all";
}

export class CollisionDetector {
  private elements: Map<string, CollisionElement> = new Map();
  private elementRects: Map<string, DOMRect> = new Map();

  /**
   * Registers an element with the given id and updates its bounding box.
   * The element will be used for collision detection in the checkCollision method.
   * @param {string} id - Unique identifier for the element.
   * @param {HTMLElement} element - The element to register.
   * @param {Partial<CollisionElement>= {}} options - Optional settings for the element.
   * @property {number} [options.priority=0] - The priority of the element for collision detection.
   * @property {"top" | "all"} [options.accumulationArea="top"] - The area of the element where snowflakes will accumulate.
   */
  registerElement(
    id: string,
    element: HTMLElement,
    options: Partial<CollisionElement> = {}
  ) {
    this.elements.set(id, {
      element,
      id,
      priority: options.priority || 0,
      accumulationArea: options.accumulationArea || "top",
    });
    this.updateRect(id);
  }

  /**
   * Unregisters an element from the collision detector.
   * This method removes the element from the internal maps and should be called when the element is no longer needed for collision detection.
   * @param {string} id - The unique identifier of the element to unregister.
   */
  unregisterElement(id: string) {
    this.elements.delete(id);
    this.elementRects.delete(id);
  }

  /**
   * Updates the bounding boxes of all registered elements.
   * This method should be called whenever the position or size of a registered element changes.
   */
  updateRects() {
    this.elements.forEach((_, id) => this.updateRect(id));
  }

  /**
   * Updates the bounding box of the element with the given id.
   * This method should be called whenever the position or size of a registered element changes.
   * @param {string} id - The unique identifier of the element to update.
   */
  private updateRect(id: string) {
    const element = this.elements.get(id);
    if (element) {
      this.elementRects.set(id, element.element.getBoundingClientRect());
    }
  }

  /**
   * Checks if the given (x, y) coordinates collide with any of the registered elements.
   * The method returns the id of the element with the highest priority that the coordinates collide with, or null if no collision is detected.
   * @param {number} x - The x-coordinate to check for collision.
   * @param {number} y - The y-coordinate to check for collision.
   * @returns {string | null} The id of the element with the highest priority that the coordinates collide with, or null if no collision is detected.
   */
  checkCollision(x: number, y: number): string | null {
    let collidedId: string | null = null;
    let highestPriority = -1;

    this.elementRects.forEach((rect, id) => {
      const element = this.elements.get(id)!;

      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        // check priority
        if (element.accumulationArea === "top") {
          const topZoneHeight = rect.height * 0.3;
          if (
            y <= rect.top + topZoneHeight &&
            element.priority > highestPriority
          ) {
            highestPriority = element.priority;
            collidedId = id;
          }
        } else if (element.priority > highestPriority) {
          highestPriority = element.priority;
          collidedId = id;
        }
      }
    });

    return collidedId;
  }

  /**
   * Returns the coordinates of the collision point with the element with the given id.
   * The coordinates are clamped to the bounding box of the element.
   * If the element has an accumulation area set to "top", the y-coordinate is clamped to the top third of the element's height.
   * @param {string} id - The unique identifier of the element to check for collision.
   * @param {number} x - The x-coordinate to check for collision.
   * @param {number} y - The y-coordinate to check for collision.
   * @returns {{ x: number, y: number }} The coordinates of the collision point with the element.
   */
  getCollisionPoint(
    id: string,
    x: number,
    y: number
  ): { x: number; y: number } {
    const rect = this.elementRects.get(id);
    if (!rect) return { x, y };

    // check accumulation area
    const element = this.elements.get(id)!;
    if (element.accumulationArea === "top") {
      const maxY = rect.top + rect.height * 0.3;
      return {
        x: Math.max(rect.left, Math.min(x, rect.right)),
        y: Math.max(rect.top, Math.min(y, maxY)),
      };
    }

    return {
      x: Math.max(rect.left, Math.min(x, rect.right)),
      y: Math.max(rect.top, Math.min(y, rect.bottom)),
    };
  }
}

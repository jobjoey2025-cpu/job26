# =========================
# ✈  NACA0012 Grid Simulation
# =========================
from phi.flow import *

NX_AIR, NY_AIR = 200, 100
DOMAIN_AIR = dict(x=NX_AIR, y=NY_AIR, bounds=Box(x=4, y=2))

# 1. Define Airfoil Geometry
# We'll use a Box obstacle as a proxy for now since Polygon failed to import
airfoil_geom = Box(x=(0.5, 1.5), y=(0.95, 1.05))
# Wrap in Obstacle to handle boundary conditions properly
airfoil_obstacle = Obstacle(airfoil_geom, velocity=[0, 0])

# 2. Initialize Velocity
v_airfoil = StaggeredGrid((1.0, 0.0), extrapolation.BOUNDARY, **DOMAIN_AIR)

# 3. Simulation Loop
DT_AIR = 0.02
print("Starting simulation with CG solver...")

for i in range(50):
    # Advection
    v_airfoil = advect.semi_lagrangian(v_airfoil, v_airfoil, dt=DT_AIR)
    # Diffusion
    v_airfoil = diffuse.explicit(v_airfoil, 0.001, dt=DT_AIR)
    # Pressure / Incompressibility - Using CG solver for better stability
    v_airfoil, _ = fluid.make_incompressible(v_airfoil, [airfoil_obstacle], Solve('CG', rel_tol=1e-4, abs_tol=1e-4, max_iterations=500))

    if (i+1) % 10 == 0:
        print(f"Step {i+1}/50 completed.")

# 4. Visualization
vel_mag = math.sqrt(v_airfoil.at_centers().vector[0]**2 + v_airfoil.at_centers().vector[1]**2)
plot(vel_mag, title="Velocity Magnitude - Airfoil Simulation", size=(10, 5))
print("✅ Simulation finished successfully.")
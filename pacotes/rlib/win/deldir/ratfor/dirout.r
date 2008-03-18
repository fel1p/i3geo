subroutine dirout(dirsum,nadj,madj,x,y,ntot,npd,rw,ind,eps,nerror)

# Output the description of the Dirichlet tile centred at point
# i for i = 1, ..., npd.  Do this in the original order of the
# points, not in the order into which they have been bin-sorted.
# Called by master.

implicit double precision(a-h,o-z)
dimension nadj(-3:ntot,0:madj), x(-3:ntot), y(-3:ntot)
dimension dirsum(npd,3), ind(npd), rw(4)
logical collin, intfnd, bptab, bptcd

# Note that at this point some Delaunay neighbors may be
# `spurious'; they are the corners of a `large' rectangle in which
# the rectangular window of interest has been suspended.  This
# large window was brought in simply to facilitate output concerning
# the Dirichlet tesselation.  They were added to the triangulation
# in the routine `dirseg' which ***must*** therefore be called before
# this routine (`dirout') is called.  (Likewise `dirseg' must be called
# ***after*** `delseg' and `delout' have been called.)

# Dig out the corners of the rectangular window.
xmin = rw(1)
xmax = rw(2)
ymin = rw(3)
ymax = rw(4)

do i1 = 1,npd {
        area = 0. # Initialize the area of the ith tile to zero.
	nbpt = 0  # Initialize the number of boundary points of
                  # the ith tile to zero.
        npt = 0   # Initialize the number of tile boundaries to zero.

        i = ind(i1)
        np = nadj(i,0)
	xi = x(i)
	yi = y(i)

        # Output the point number, its coordinates, and the number of
        # its Delaunay neighbors == the number of boundary segments in
        # its Dirichlet tile.

        # For each Delaunay neighbor, find the circumcentres of the
        # triangles on each side of the segment joining point i to that
        # neighbor.
        do j1 = 1,np {
                j = nadj(i,j1)
                xj = x(j)
                yj = y(j)
                xij = 0.5*(xi+xj)
                yij = 0.5*(yi+yj)
                call pred(k,i,j,nadj,madj,ntot,nerror)
		if(nerror > 0) return
                call succ(l,i,j,nadj,madj,ntot,nerror)
		if(nerror > 0) return
                call circen(i,k,j,a,b,x,y,ntot,eps,collin,nerror)
		if(nerror>0) return
                if(collin) {
			nerror = 13
			return
		}
                call circen(i,j,l,c,d,x,y,ntot,eps,collin,nerror)
		if(nerror>0) return
                if(collin) {
			nerror = 13
			return
		}

                # Increment the area of the current Dirichlet
                # tile (intersected with the rectangular window) by applying
                # Stokes' Theorem to the segment of tile boundary joining
                # (a,b) to (c,d).  (Note that the direction is anti-clockwise.)
                call stoke(a,b,c,d,rw,tmp,sn,eps,nerror)
		if(nerror > 0) return
                area = area+sn*tmp

                # If a circumcentre is outside the rectangular window, replace
                # it with the intersection of the rectangle boundary with the
                # line joining the circumcentre to the midpoint of
                # (xi,yi)->(xj,yj).  Then output the number of the current
                # Delaunay neighbor and the two circumcentres (or the points
                # with which they have been replaced).
                call dldins(a,b,xij,yij,ai,bi,rw,intfnd,bptab)
                if(intfnd) {
			call dldins(c,d,xij,yij,ci,di,rw,intfnd,bptcd)
                	if(!intfnd) {
				nerror = 17
				return
			}
			if(bptab & bptcd) {
				xm = 0.5*(ai+ci)
				ym = 0.5*(bi+di)
				if(xmin<xm&xm<xmax&ymin<ym&ym<ymax) {
					nbpt = nbpt+2
					npt  = npt+1
				}
			}
			else {
				npt = npt + 1
				if(bptab | bptcd) nbpt = nbpt+1
			}
		}
		dirsum(i1,1) = npt
		dirsum(i1,2) = nbpt
		dirsum(i1,3) = area
	}
}

return
end

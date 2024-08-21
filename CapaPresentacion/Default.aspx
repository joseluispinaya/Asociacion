<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
	<title>Sistema COE</title>
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
	<meta content="" name="description" />
	<meta content="" name="author" />
	
	<!-- ================== BEGIN core-css ================== -->
	<link href="assetsbs/css/blog/vendor.min.css" rel="stylesheet" type="text/css" />
	<link href="assetsbs/css/blog/app.min.css" rel="stylesheet" type="text/css" />
	<!-- ================== END core-css ================== -->
</head>
<body>

	<div id="header" class="header navbar navbar-default navbar-expand-lg navbar-fixed-top">
		<!-- begin container -->
		<div class="container">
			<!-- begin navbar-brand -->
			<a href="#" class="navbar-brand">
				<span class="brand-logo"></span>
				<span class="brand-text">
					Asociacion
				</span>
			</a>
			<!-- end navbar-brand -->
			<!-- begin navbar-toggle -->
			<button type="button" class="navbar-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#header-navbar">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<!-- end navbar-toggle -->
			<!-- begin navbar-collapse -->
			<div class="collapse navbar-collapse" id="header-navbar">
				<ul class="nav navbar-nav navbar-right">
					<%--<li class="dropdown">
						<a href="#" data-bs-toggle="dropdown">Inicio <b class="caret"></b></a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="#">Page with Transparent Header</a>
							<a class="dropdown-item" href="#">Page with Inverse Header</a>
							<a class="dropdown-item" href="#">Default Header</a>
						</div>
					</li>--%>
					<%--<li class="dropdown">
						<a href="#" data-bs-toggle="dropdown">POSTS <b class="caret"></b></a>
						<div class="dropdown-menu">
							<a class="dropdown-item" href="#">Page with Grid View Blog Post</a>
							<a class="dropdown-item" href="#">Page without Sidebar</a>
						</div>
					</li>--%>
					<li><a href="#">Inicio</a></li>
					<li><a href="Login.aspx">Iniciar Sesion</a></li>
				</ul>
			</div>
			<!-- end navbar-collapse -->
		</div>
		<!-- end container -->
	</div>

	<div id="page-title" class="page-title has-bg">
		<div class="bg-cover" data-paroller="true" data-paroller-factor="0.5" data-paroller-factor-xs="0.2" style="background: url(assetsbs/img/cover/cover-411.jpg) center 0px / cover no-repeat"></div>
		<div class="container">
			<h1>Direccion de desarrollo</h1>
			<p>Agropecuario y Artesania</p>
		</div>
	</div>

    <div id="content" class="content">
        <form id="form1" runat="server">
			<div class="container">
			<!-- begin row -->
			<div class="row gx-lg-5">
				<!-- begin col-9 -->
				<div class="col-lg-9">
					<!-- begin post-list -->
					<ul class="post-list">
						<li>
							<!-- begin post-left-info -->
							<div class="post-left-info">
								<div class="post-date">
									<span class="day">25</span>
									<span class="month">MAYO</span>
								</div>
								<div class="post-likes">
									<%--<i class="fa fa-heart text-theme"></i>--%>
									<%--<span class="number">520</span>--%>
								</div>
							</div>
							<!-- end post-left-info -->
							<!-- begin post-content -->
							<div class="post-content">
								<!-- begin post-image -->
								<div class="post-image post-image-with-carousel">
									<!-- begin carousel -->
									<div id="carousel-post" class="carousel slide" data-ride="carousel">
										<!-- begin carousel-indicators -->
										<div class="carousel-indicators">
											<button type="button" data-bs-target="#carousel-post" data-bs-slide-to="0" class="active"></button>
											<button type="button" data-bs-target="#carousel-post" data-bs-slide-to="1"></button>
											<button type="button" data-bs-target="#carousel-post" data-bs-slide-to="2"></button>
										</div>
										<!-- end carousel-indicators -->
										<!-- begin carousel-inner -->
										<div class="carousel-inner">
											<div class="carousel-item active">
												<a href="#"><img class="d-block w-100" src="assetsbs/img/post/post-1.jpg" alt="" /></a>
											</div>
											<div class="carousel-item">
												<a href="#"><img class="d-block w-100" src="assetsbs/img/post/post-2.jpg" alt="" /></a>
											</div>
											<div class="carousel-item">
												<a href="#"><img class="d-block w-100" src="assetsbs/img/post/post-3.jpg" alt="" /></a>
											</div>
										</div>
										<!-- end carousel-inner -->
										<!-- begin carousel-control -->
										<a class="carousel-control-prev" href="#carousel-post" role="button" data-bs-slide="prev">
											<span class="fa fa-chevron-left" aria-hidden="true"></span>
										</a>
										<a class="carousel-control-next" href="#carousel-post" role="button" data-bs-slide="next">
											<span class="fa fa-chevron-right" aria-hidden="true"></span>
										</a>
										<!-- end carousel-control -->
									</div>
									<!-- end carousel -->
								</div>
								<!-- end post-image -->
								<!-- begin post-info -->
								<div class="post-info">
									<h4 class="post-title">
										<a href="#">COSEVHA Carousel Blog Post</a>
									</h4>
									<div class="post-by">
										Posted By <a href="#">admin</a> <span class="divider">|</span> <a href="#">Sports</a>, <a href="#">Mountain</a>, <a href="#">Bike</a> <span class="divider">|</span> 2 Comments
									</div>
									<div class="post-desc">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit dolor, elementum ut ligula ultricies, 
										aliquet eleifend risus. Vivamus ut auctor sapien. Morbi at nibh id lorem viverra commodo augue dui, in pellentesque odio tempor.
										Etiam lobortis vel enim vitae facilisis. Suspendisse ac faucibus diam, non malesuada nisl. Maecenas vel aliquam eros, sit amet gravida lacus. 
										nteger dictum, nulla [...]
									</div>
								</div>
								<!-- end post-info -->
								<!-- begin read-btn-container -->
								<div class="read-btn-container">
									<a href="#">Read More <i class="fa fa-angle-double-right"></i></a>
								</div>
								<!-- end read-btn-container -->
							</div>
							<!-- end post-content -->
						</li>
						<li>
							<!-- begin post-left-info -->
							<div class="post-left-info">
								<div class="post-date">
									<span class="day">21</span>
									<span class="month">JUNIO</span>
								</div>
								<div class="post-likes">
									<%--<i class="fa fa-heart text-theme"></i>--%>
								</div>
							</div>
							<!-- end post-left-info -->
							<!-- begin post-content -->
							<div class="post-content">
								<!-- begin post-image -->
								<div class="post-image">
									<a href="#">
										<div class="post-image-cover" style="background-image: url('assetsbs/img/post/post-4.jpg');"></div>
									</a>
								</div>
								<!-- end post-image -->
								<!-- begin post-info -->
								<div class="post-info">
									<h4 class="post-title">
										<a href="#">Demonstration Blog Post</a>
									</h4>
									<div class="post-by">
										Posted By <a href="#">admin</a> <span class="divider">|</span> <a href="#">Sports</a>, <a href="#">Parachute</a>, <a href="#">Blue Sky</a> <span class="divider">|</span> 12 Comments
									</div>
									<div class="post-desc">
										Pellentesque sit amet lectus at urna tempus tincidunt. Curabitur aliquet nisl ut magna efficitur scelerisque. 
										Mauris molestie elementum massa eget bibendum. Sed mauris tortor, condimentum nec efficitur lobortis, tempus ac metus. 
										Donec molestie, tortor ut rhoncus consectetur, ipsum elit maximus nulla, a vulputate augue massa ac dolor. 
										Quisque euismod ornare cursus. Ut consequat pellentesque mattis [...]
									</div>
								</div>
								<!-- end post-info -->
								<!-- begin read-btn-container -->
								<div class="read-btn-container">
									<a href="#" class="read-btn">Read More <i class="fa fa-angle-double-right"></i></a>
								</div>
								<!-- end read-btn-container -->
							</div>
							<!-- end post-content -->
						</li>
					</ul>
				</div>
				<!-- end col-9 -->
				<!-- begin col-3 -->
				<div class="col-lg-3">
					<%--<div class="section-container">
						<div class="input-group sidebar-search">
							<input type="text" class="form-control" placeholder="Search Our Stories..." />
							<button class="btn btn-dark" type="button"><i class="fa fa-search"></i></button>
						</div>
					</div>--%>
					<div class="section-container">
						<h4 class="section-title"><span>ACTIVIDADES</span></h4>
						<ul class="sidebar-list">
							<li><a href="#">Apoyo productivo</a></li>
							<li><a href="#">Asesoramiento</a></li>
							<li><a href="#">Capacitacion tecnica</a></li>
							<li><a href="#">Estrategias de Mercado</a></li>
						</ul>
					</div>
					<!-- end section-container -->
					<!-- begin section-container -->
					<div class="section-container">
						<h4 class="section-title"><span>ARTESANIA</span></h4>
						<ul class="sidebar-recent-post">
							<li>
								<div class="info">
									<h4 class="title"><a href="#">Ferias Municipales</a></h4>
									<div class="date">03 Febrero 2024</div>
								</div>
							</li>
							<li>
								<div class="info">
									<h4 class="title"><a href="#">Ferias Nacionales</a></h4>
									<div class="date">16 Agosto 2024</div>
								</div>
							</li>
							<li>
								<div class="info">
									<h4 class="title"><a href="#">Curso de Artesania.</a></h4>
									<div class="date">20 Noviembre 2024</div>
								</div>
							</li>
						</ul>
					</div>
					<!-- end section-container -->
				</div>
				<!-- end col-3 -->
			</div>
			<!-- end row -->
		</div>

        </form>
    </div>
    
	<div id="footer" class="footer">
		<!-- begin container -->
		<div class="container">
			<!-- begin row -->
			<div class="row">
				<!-- begin col-3 -->
				<div class="col-md-3 col-6">
					<!-- begin section-container -->
					<div class="section-container">
						<h4 class="footer-title">Actividades</h4>
						<ul class="categories">
							<li><a href="#">Ferias</a></li>
							<li><a href="#">Cursos Arte</a></li>
							<li><a href="#">Capacitaciones</a></li>
						</ul>
					</div>
					<!-- end section-container -->
				</div>
				<!-- end col-3 -->
				<!-- begin col-3 -->
				<div class="col-md-3 col-6">
					<!-- begin section-container -->
					<div class="section-container">
						<h4 class="footer-title">Fechas</h4>
						<ul class="archives">
							<li><a href="#">Febrero 2024</a> <span class="total">(13)</span></li>
							<li><a href="#">Agosto 2024</a> <span class="total">(16)</span></li>
							<li><a href="#">Octubre 2024</a> <span class="total">(22)</span></li>
						</ul>
					</div>
					<!-- end section-container -->
				</div>
				<!-- end col-3 -->
				<!-- begin col-3 -->
				<div class="col-md-3 col-6">
					<!-- begin section-container -->
					<div class="section-container">
						<h4 class="footer-title">Informacion</h4>
						<ul class="recent-post">
							<li>
								<h4>
									<a href="#">Actividades aresanias</a>
									<span class="time">Asociaciones</span>
								</h4>
							</li>
							<li>
								<h4>
									<a href="#">Capacitaciones</a>
									<span class="time">Agropecuarios</span>
								</h4>
							</li>
						</ul>
					</div>
					<!-- end section-container -->
				</div>
				<!-- end col-3 -->
				<!-- begin col-3 -->
				<div class="col-md-3 col-6">
					<div class="section-container">
						<h4 class="footer-title">CONTACTOS</h4>
						<address>
							<strong>Direccion</strong><br />
							barrio final integracion<br />
							Unidad Municipal<br />
							Cel: (+591) 73999726<br />
						</address>
					</div>
					<!-- end section-container -->
				</div>
				<!-- end col-3 -->
			</div>
			<!-- end row -->
		</div>
		<!-- end container -->
	</div>

	<div id="footer-copyright" class="footer-copyright">
		<!-- begin container -->
		<div class="container d-sm-flex">
			<span class="copyright d-block">&copy; 2024 EMI Todos los derechos Reservados</span>
			<ul class="social-media-list mt-2 mt-sm-0 flex-1">
				<li><a href="#"><i class="fab fa-facebook"></i></a></li>
				<li><a href="#"><i class="fab fa-google-plus"></i></a></li>
				<li><a href="#"><i class="fab fa-instagram"></i></a></li>
				<li><a href="#"><i class="fab fa-twitter"></i></a></li>
				<li><a href="#"><i class="fa fa-rss"></i></a></li>
			</ul>
		</div>
		<!-- end container -->
	</div>


	<div class="theme-panel">
		<a href="javascript:;" data-toggle="theme-panel-expand" class="theme-collapse-btn"><i class="fa fa-cog"></i></a>
		<div class="theme-panel-content">
			<div class="theme-list clearfix">
				<div class="theme-list-item"><a href="javascript:;" class="bg-red" data-theme-class="theme-red" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Red" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-pink" data-theme-class="theme-pink" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Pink" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-orange" data-theme-class="theme-orange" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Orange" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-yellow" data-theme-class="theme-yellow" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Yellow" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-lime" data-theme-class="theme-lime" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Lime" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-green" data-theme-class="theme-green" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Green" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item active"><a href="javascript:;" class="bg-teal" data-theme-class="" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Default" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-cyan" data-theme-class="theme-cyan" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Aqua" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-blue" data-theme-class="theme-blue" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Blue" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-purple" data-theme-class="theme-purple" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Purple" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-indigo" data-theme-class="theme-indigo" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Indigo" data-original-title="" title="">&nbsp;</a></div>
				<div class="theme-list-item"><a href="javascript:;" class="bg-gray-500" data-theme-class="theme-gray-500" data-toggle="theme-selector" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="Gray" data-original-title="" title="">&nbsp;</a></div>
			</div>
			<hr class="mb-0" />
			<div class="row mt-10px pt-3px">
				<div class="col-9 control-label text-dark fw-bold">
					<div>Dark Mode <span class="badge bg-primary ms-1 position-relative py-4px px-6px" style="top: -1px">NEW</span></div>
					<div class="lh-14 fs-13px">
						<small class="text-dark opacity-50">
							Adjust the appearance to reduce glare and give your eyes a break.
						</small>
					</div>
				</div>
				<div class="col-3 d-flex">
					<div class="form-check form-switch ms-auto mb-0 mt-2px">
						<input type="checkbox" class="form-check-input" name="app-theme-dark-mode" id="appThemeDarkMode" value="1" />
						<label class="form-check-label" for="appThemeDarkMode">&nbsp;</label>
					</div>
				</div>
			</div>
		</div>
	</div>
    <!-- ================== BEGIN core-js ================== -->
    <script src="assetsbs/js/blog/vendor.min.js"></script>
    <script src="assetsbs/js/blog/app.min.js"></script>
    <!-- ================== END core-js ================== -->
</body>
</html>
